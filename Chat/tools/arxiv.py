from langchain_community.tools import ArxivQueryRun
from langchain_community.utilities import ArxivAPIWrapper

api_wrapper_arxiv = ArxivAPIWrapper(top_k_results=2, doc_content_chars_max=500)
arxiv_tool = ArxivQueryRun(api_wrapper=api_wrapper_arxiv, description="Query arXiv papers")
