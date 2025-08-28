# import os
# from langchain_community.tools.tavily_search import TavilySearchResults

# tavily_tool = TavilySearchResults(api_key=os.getenv("TAVILY_API_KEY"))


import os
from dotenv import load_dotenv
from langchain_tavily import TavilySearch

load_dotenv()

tavily_tool = TavilySearch(tavily_api_key=os.getenv("TAVILY_API_KEY"))
