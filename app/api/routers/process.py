from fastapi import APIRouter,HTTPException,Request,Depends,Response
import uuid
import os
from typing import Tuple
from pydantic import BaseModel
import langchain
from langchain.vectorstores.faiss import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.document_loaders import TextLoader

from dotenv import load_dotenv

load_dotenv()

langchain.embeddings.openai.api_key = os.getenv("OPENAI_API_KEY")

process_router = APIRouter()

class ProcessRequest(BaseModel):
    path: str
    file_name:str


@process_router.post('/')
async def use_embeddings(req: ProcessRequest):
    try:
        path=req.path
        file_name=req.file_name
        loader = TextLoader(path,encoding='utf-8')
        document=loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=10)
        documents = text_splitter.split_documents(document)
        embeddings = OpenAIEmbeddings()
        # instruct_model = HuggingFaceInstructEmbeddings(model_name='hkunlp/instructor-xl',model_kwargs = {'device': 'cpu'})
        vectorstore = FAISS.from_documents(documents,embeddings)
        vectorstore.save_local(file_name)
        return {'result':True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


