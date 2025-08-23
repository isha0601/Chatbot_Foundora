from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

load_dotenv()

def create_conversation_chain():
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY")
    )

    memory = ConversationBufferMemory(return_messages=True)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful and conversational AI assistant."),
        ("human", "{user_input}")
    ])

    return LLMChain(
        llm=llm,
        prompt=prompt,
        memory=memory,
        verbose=True
    )
