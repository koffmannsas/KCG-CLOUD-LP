import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from 'url';
import textToSpeech from '@google-cloud/text-to-speech';

// Safe environment-agnostic directory resolution for hybrid CJS/ESM runtimes
const getDirname = () => {
  try {
    if (typeof __dirname !== "undefined" && __dirname) {
      return __dirname;
    }
    // Only parse URL when running under active ESM with imported module meta
    if (typeof import.meta !== "undefined" && import.meta.url) {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch (e) {}
  return process.cwd();
};

const __dirnameResolved = getDirname();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ttsClient = new textToSpeech.TextToSpeechClient();

  // Import AI Gateway
  const { aiGatewayRouter } = await import('./ai-gateway.js').catch(e => import('./ai-gateway.ts'));
  app.use('/api/ai', aiGatewayRouter);

  app.post("/api/tts", async (req, res) => {
    try {
      const { text } = req.body;
      const [response] = await ttsClient.synthesizeSpeech({
        input: { text },
        voice: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B' },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.90, pitch: -2.0 },
      });

      res.set('Content-Type', 'audio/mpeg');
      res.send(response.audioContent);
    } catch (error) {
      console.error('TTS Error:', error);
      res.status(500).json({ error: 'Failed to generate audio' });
    }
  });

  // API placeholders
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Live Cloud Run serves compiled static static production assets from standard client path
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
