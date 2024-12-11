export class OpenAIError extends Error {
  constructor(message: string, public data?: any) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export async function generateDebateResponse(
  apiKey: string,
  topic: string,
  previousResponses: string[],
  side: "for" | "against"
) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI debater taking the ${side === "for" ? "supporting" : "opposing"} position on the topic of ${topic}. 
            Provide a clear, logical argument ${side === "for" ? "in favor of" : "against"} the topic. 
            Keep your response under 100 words. Be concise, respectful but firm in your position.
            ${previousResponses.length > 0 ? "Address the points made in the previous argument: " + previousResponses[previousResponses.length - 1] : ""}`
          },
          {
            role: "user",
            content: `Present your ${side === "for" ? "supporting" : "opposing"} argument on ${topic} in under 100 words.`
          }
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new OpenAIError(
        `OpenAI API error: ${response.status} ${response.statusText}`,
        errorData
      );
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new OpenAIError("Invalid response format from OpenAI API", data);
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAIError) throw error;
    throw new OpenAIError(
      error instanceof Error ? error.message : "Unknown error occurred",
      error
    );
  }
}