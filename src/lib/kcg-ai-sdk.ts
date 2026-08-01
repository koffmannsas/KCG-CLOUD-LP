export class KCGAI {
  /**
   * Sends a generation prompt to the internal KCG AI Gateway.
   * Abstracted from Gemini, OpenAI, Claude, etc.
   *
   * @param prompt The string prompt for the AI to answer.
   * @param options Additional generation options. (Currently only `type` is handled: 'text' or 'audio')
   */
  async generate(prompt: string, options?: { type?: 'text' | 'audio' }): Promise<string> {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type: options?.type || 'text' })
    });

    if (!res.ok) {
      throw new Error("Erreur de communication avec le gateway IA.");
    }

    const data = await res.json();
    return data.normalizedResponse;
  }
}
