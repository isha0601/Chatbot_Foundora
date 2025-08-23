from langgraph.graph import StateGraph, END
from src.chatbot import create_conversation_chain

def chatbot_step(state):
    user_input = state["input"]
    conversation_chain = create_conversation_chain()
    response = conversation_chain.run(user_input=user_input)
    return {"output": response}

def create_app():
    workflow = StateGraph(dict)
    workflow.add_node("chatbot", chatbot_step)
    workflow.set_entry_point("chatbot")
    workflow.add_edge("chatbot", END)
    return workflow.compile()
