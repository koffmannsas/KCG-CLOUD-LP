import { GoogleGenAI } from '@google/genai';

export interface ProviderMetrics {
  name: string;
  cost: number;
  quota: number;
  latency: number;
  availability: number;
  priority: number;
  healthScore: number;
  lastSuccess: Date | null;
  lastFailure: Date | null;
  tokensRemaining: number;
}

export interface AIProvider {
  name: string;
  generate: (prompt: string, options?: any) => Promise<string>;
  generateAudio: (text: string, options?: any) => Promise<string>;
  metrics: ProviderMetrics;
}

const mockMetrics = (name: string): ProviderMetrics => ({
  name,
  cost: 0.001,
  quota: 100000,
  latency: 0,
  availability: 100,
  priority: 1,
  healthScore: 100,
  lastSuccess: new Date(),
  lastFailure: null,
  tokensRemaining: 100000,
});

export class ProviderManager {
  providers: Map<string, AIProvider> = new Map();

  constructor() {
    this.registerGemini();
    this.registerDummyProviders();
  }

  private registerGemini() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    this.providers.set('gemini', {
      name: 'Gemini',
      metrics: { ...mockMetrics('Gemini'), priority: 10 },
      generate: async (prompt, options) => {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });
        return response.text;
      },
      generateAudio: async (text, options) => {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Charon' },
                },
            },
          },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) throw new Error('No audio returned');
        return base64Audio;
      }
    });
  }

  private registerDummyProviders() {
    const dummies = ['OpenAI', 'Claude', 'Mistral', 'DeepSeek', 'OpenRouter', 'Groq', 'Vertex AI', 'Azure OpenAI', 'Ollama', 'LM Studio'];
    dummies.forEach(name => {
      this.providers.set(name.toLowerCase(), {
        name,
        metrics: { ...mockMetrics(name), priority: Math.random() * 5 },
        generate: async () => `[${name}] Simulated response`,
        generateAudio: async () => { throw new Error('Not implemented for dummy'); }
      });
    });
  }

  async testHealth() {
    console.log('[Health Monitor] Running health check for all providers...');
    for (const [key, provider] of this.providers.entries()) {
      const start = Date.now();
      try {
        if (key === 'gemini') {
          await provider.generate("Test ping");
        }
        provider.metrics.latency = Date.now() - start;
        provider.metrics.lastSuccess = new Date();
        provider.metrics.healthScore = Math.min(100, provider.metrics.healthScore + 5);
      } catch (e) {
        provider.metrics.lastFailure = new Date();
        provider.metrics.healthScore = Math.max(0, provider.metrics.healthScore - 20);
      }
    }
  }

  startHealthMonitor() {
    setInterval(() => this.testHealth(), 60000); // Every 60s
  }
}

export class KCGAIGateway {
  manager: ProviderManager;
  cache: Map<string, { result: any, expires: number }> = new Map();
  CACHE_TTL = 3600000; // 1 hour

  constructor() {
    this.manager = new ProviderManager();
    this.manager.startHealthMonitor();
  }

  private getBestProvider(type: 'text' | 'audio'): AIProvider {
    const available = Array.from(this.manager.providers.values())
      .filter(p => p.metrics.healthScore > 50)
      .filter(p => type === 'audio' ? p.name === 'Gemini' : true) // only gemini has audio in our setup
      .sort((a, b) => b.metrics.priority - a.metrics.priority); // sort by priority for simplicity

    if (available.length === 0) {
      throw new Error("No providers available");
    }
    return available[0];
  }

  private async executeWithRetry(type: 'text' | 'audio', payload: string): Promise<any> {
    let attempts = 0;
    const maxAttempts = 3;
    let baseDelay = 1000;

    while (attempts < maxAttempts) {
      const provider = this.getBestProvider(type);
      try {
        if (type === 'text') {
           return await provider.generate(payload);
        } else {
           return await provider.generateAudio(payload);
        }
      } catch (e) {
        attempts++;
        console.warn(`[AI Gateway] ${provider.name} failed. Attempt ${attempts}/${maxAttempts}`);
        provider.metrics.healthScore = Math.max(0, provider.metrics.healthScore - 10);

        if (attempts >= maxAttempts) {
           break;
        }
        await new Promise(r => setTimeout(r, baseDelay * Math.pow(2, attempts))); // Exponential backoff
      }
    }

    if (type === 'text') {
      return "L'analyse stratégique est en cours de préparation. Nos moteurs d'intelligence sont temporairement fortement sollicités. Merci de patienter quelques instants.";
    } else {
      throw new Error("Audio generation failed across all providers");
    }
  }

  async generateContent(prompt: string): Promise<string> {
    const cacheKey = `text:${prompt}`;
    if (this.cache.has(cacheKey) && this.cache.get(cacheKey)!.expires > Date.now()) {
      return this.cache.get(cacheKey)!.result;
    }

    const response = await this.executeWithRetry('text', prompt);

    this.cache.set(cacheKey, { result: response, expires: Date.now() + this.CACHE_TTL });
    return response;
  }

  async generateAudio(text: string): Promise<string> {
    const cacheKey = `audio:${text}`;
    if (this.cache.has(cacheKey) && this.cache.get(cacheKey)!.expires > Date.now()) {
      return this.cache.get(cacheKey)!.result;
    }

    const response = await this.executeWithRetry('audio', text);

    this.cache.set(cacheKey, { result: response, expires: Date.now() + this.CACHE_TTL });
    return response;
  }

  getAdminMetrics() {
    return Array.from(this.manager.providers.values()).map(p => p.metrics);
  }
}

export const gateway = new KCGAIGateway();

import { Router } from 'express';

export const aiGatewayRouter = Router();

aiGatewayRouter.post('/generate', async (req, res) => {
  try {
    const { prompt, type } = req.body;
    if (type === 'audio') {
      const audio = await gateway.generateAudio(prompt);
      res.json({ normalizedResponse: audio, type: 'audio' });
    } else {
      const text = await gateway.generateContent(prompt);
      res.json({ normalizedResponse: text, type: 'text' });
    }
  } catch (error) {
    console.error('[AI Gateway API Error]', error);
    res.status(500).json({ error: 'Internal Gateway Error' });
  }
});

aiGatewayRouter.get('/admin/metrics', (req, res) => {
  res.json(gateway.getAdminMetrics());
});
