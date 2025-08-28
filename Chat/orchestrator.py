import os
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
from tools.arxiv import arxiv_tool
from tools.wiki import wiki_tool
from tools.tavily import tavily_tool

# Load Groq LLM
llm = ChatGroq(model="qwen/qwen3-32b", api_key=os.getenv("GROQ_API_KEY"))

# Combine tools
tools = [arxiv_tool, wiki_tool, tavily_tool]

# Create ReAct agent with tools
agent = create_react_agent(llm, tools)

def run_query(query: str):
    response = agent.invoke({"messages": [("user", query)]})

    # Handle different response formats
    if isinstance(response, dict):
        return response.get("output") or response.get("answer") or str(response)
    return str(response)


if __name__ == "__main__":
    query = "Tell me about LangChain and its use in AI agents."
    print(run_query(query))
