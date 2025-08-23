# Gemini + LangChain + LangGraph Chatbot

This is a chatbot built with **Google Gemini**, **LangChain**, and **LangGraph**, available in **Terminal** and **Streamlit Web UI**.


---


## 🚀 Features
- Gemini-powered AI assistant.
- Terminal mode & Web UI (Streamlit).
- Memory support for conversations.
- `.env` file for secure API key storage.


---


## 📂 Project Structure
```
chatbot-project/
│── .env # Store your GEMINI_API_KEY here
│── requirements.txt # Dependencies
│── main.py # Terminal chatbot
│── streamlit_app.py # Web chatbot (Streamlit)
|
├── src/
│ ├── chatbot.py # Chatbot chain setup
│ └── graph.py # LangGraph workflow
```


---


## 🔑 Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```
2. Create `.env` file:
```env
GEMINI_API_KEY=your_api_key_here
```
3. Run terminal chatbot:
```bash
python main.py
```
4. Run Streamlit chatbot:
```bash
streamlit run streamlit_app.py
```


