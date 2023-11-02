# from fastapi import APIRouter,HTTPException,Request,Depends,Response
# import uuid
# import os
# from typing import Tuple
# from pydantic import BaseModel
# import langchain
# from langchain.vectorstores.faiss import FAISS
# from langchain.text_splitter import CharacterTextSplitter
# from langchain.embeddings import HuggingFaceInstructEmbeddings
# from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain.document_loaders import TextLoader

# from dotenv import load_dotenv

# load_dotenv()

# langchain.embeddings.openai.api_key = os.getenv("OPENAI_API_KEY")

# chat_router = APIRouter()

# class ChatRequest(BaseModel):
#     chat_title:str

# # Dictionary to store user-specific history
# #user_memories={user1_id:[{chat_id:memory}],user2_id:[{chat_id:memory},{chat_id:memory}]...}
# user_memories = {}

# def get_or_create_user_memory(request: Request) -> Tuple[str]:
#     session_id = request.cookies.get("session_id")
#     if session_id is None:
#         # Generate a new session ID
#         print(True)
#         session_id = str(uuid.uuid4())
#     return session_id,


# @chat_router.post('/')
# async def use_embeddings(req: ChatRequest,response:Response,user_memory_background: Tuple[str] = Depends(get_or_create_user_memory)):
#     try:
#         chat_title=req.chat_title
#         session_id = user_memory_background[0]
#         chat_id = str(uuid.uuid4())
#         if not user_memories.get(session_id):
#             user_memories[session_id] = []
#             response.set_cookie("session_id", session_id)
#         user_memories[session_id].append({chat_id:{'title':chat_title}})
#         print(user_memories)
#         return {'chat_id':chat_id,'chat_title':chat_title,'session_id':session_id}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


