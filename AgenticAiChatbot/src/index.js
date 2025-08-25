import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools: [
    {
      functionDeclarations: [
        {
          name: "calculator",
          description:
            "Evaluate a mathematical expression. Use this for any calculations.",
          parameters: {
            type: "object",
            properties: {
              expression: {
                type: "string",
                description:
                  'The math expression to evaluate, e.g., "2 + 2 * 3"',
              },
            },
            required: ["expression"],
          },
        },
      ],
    },
  ],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        { text: "You are a helpful AI agent. Use tools when necessary." },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Understood! I’m ready to assist. Ask away!" }],
    },
  ],
});

async function main() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    try {
      const result = await chat.sendMessage(input);
      const response = result.response;

      // Handle function calls
      const functionCalls = response.functionCalls();
      if (functionCalls && functionCalls.length > 0) {
        for (const call of functionCalls) {
          if (call.name === "calculator") {
            const expr = call.args.expression;
            try {
              // WARNING: eval() can be dangerous with untrusted input; for demo only
              const calcResult = eval(expr);
              const toolResponse = await chat.sendMessage([
                {
                  functionResponse: {
                    name: "calculator",
                    response: { result: String(calcResult) },
                  },
                },
              ]);
              console.log("Assistant:", toolResponse.response.text());
            } catch (error) {
              console.log(
                "Assistant:",
                `Error evaluating expression: ${error.message}`
              );
            }
          }
        }
      } else {
        // Handle text response
        const text = response.text();
        console.log("Assistant:", text);
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Response details:", error.response.data);
      }
    }

    main(); // Continue the loop
  });
}

console.log('Chat with the Assistant! Type "exit" to quit.');
main();
