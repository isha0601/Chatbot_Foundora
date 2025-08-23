import streamlit as st
from src.graph import create_app

st.set_page_config(page_title="Gemini Chatbot", page_icon="🤖", layout="centered")

st.title("🤖 Gemini + LangChain + LangGraph Chatbot")

# Initialize chatbot app only once
if "chatbot" not in st.session_state:
    st.session_state.chatbot = create_app()
    st.session_state.history = []

# Chat input
user_input = st.chat_input("Say something...")

if user_input:
    result = st.session_state.chatbot.invoke({"input": user_input})
    st.session_state.history.append(("You", user_input))
    st.session_state.history.append(("Bot", result["output"]))

# Display chat history
for role, message in st.session_state.history:
    if role == "You":
        st.markdown(f"**🧑 You:** {message}")
    else:
        st.markdown(f"**🤖 Bot:** {message}")
