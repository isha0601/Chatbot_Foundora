# import re
# from orchestrator import run_query
# from redis_store import save_history, load_history

# SESSION_ID = "user_isha"

# def clean_input(user_input: str) -> str:
#     return re.sub(r"\s+", " ", user_input.strip())

# def chat():
#     print("🤖 Chatbot with Arxiv + Wikipedia + Tavily + Groq Qwen32B")
#     print("Type 'exit' to quit.\n")

#     history = load_history(SESSION_ID)

#     while True:
#         query = input("You: ")
#         query = clean_input(query)

#         if not query:
#             continue
#         if query.lower() in ["exit", "quit"]:
#             break

#         response = run_query(query)
#         history.append({"user": query, "bot": response})

#         save_history(SESSION_ID, history)
#         print("Bot:", response)

# if __name__ == "__main__":
#     chat()





import os
from orchestrator import run_query
from redis_store import load_history, save_history

SESSION_ID = "chatbot_session_1"

def chat():
    print("🤖 Chatbot with Arxiv + Wikipedia + Tavily + Groq Qwen32B")
    print("Type 'exit' to quit.\n")

    history = load_history(SESSION_ID)

    while True:
        query = input("You: ").strip()
        if query.lower() in ["exit", "quit"]:
            print("👋 Goodbye!")
            break

        # Append user query to history
        history.append({"role": "user", "content": query})

        # Run query through orchestrator
        response = run_query(query)

        # Append AI response to history
        history.append({"role": "assistant", "content": response})

        # Save history to Redis
        save_history(SESSION_ID, history)

        print(f"AI: {response}\n")

if __name__ == "__main__":
    chat()
