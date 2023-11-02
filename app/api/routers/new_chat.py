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
from langchain.memory import ConversationBufferMemory

from dotenv import load_dotenv

load_dotenv()

langchain.embeddings.openai.api_key = os.getenv("OPENAI_API_KEY")

chat_router = APIRouter()

class ChatRequest(BaseModel):
    chat_title:str

# Dictionary to store user-specific history
#user_memories={user1_id:[{chat_id:memory}],user2_id:[{chat_id:memory},{chat_id:memory}]...}
chats_memories = {}



@chat_router.post('/')
async def open_chat(req: ChatRequest):
    try:
        chat_title=req.chat_title
        chat_id = str(uuid.uuid4())
        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        chats_memories[chat_id]={'title':chat_title,'memory':memory,'conversation':[]}
        return {'chat_id':chat_id,'chat_title':chat_title}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


