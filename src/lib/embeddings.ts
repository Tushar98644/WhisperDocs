import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (result && result.data && result.data.length > 0 && result.data[0].embedding) {
      console.log("Embeddings result:", result);
      const embedded_data = result.data[0].embedding as number[];
      return embedded_data;
    } else {
      throw new Error("Invalid response format from OpenAI API");
    }
  } catch (error) {
    console.error("Error calling OpenAI embeddings API:", error);
    console.error("Input text:", text);
    throw new Error("Error calling OpenAI embeddings API");
  }
};