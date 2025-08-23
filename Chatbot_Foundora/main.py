from src.graph import create_app

if __name__ == "__main__":
    app = create_app()
    print("🤖 Chatbot is running in terminal! Type 'exit' to quit.\n")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye 👋")
            break
        result = app.invoke({"input": user_input})
        print("Bot:", result["output"])
