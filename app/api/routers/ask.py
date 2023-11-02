from fastapi import FastAPI, Request, APIRouter,HTTPException
from fastapi.encoders import jsonable_encoder
import os
import openai
from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel
import langchain
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
from app.constants.template import custom_template
from langchain.prompts.prompt import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from app.api.routers.new_chat import chats_memories
import json

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
embeddings = OpenAIEmbeddings()
CUSTOM_QUESTION_PROMPT = PromptTemplate.from_template(custom_template)

class AskRequest(BaseModel):
    questions: str
    path: str   
    chat_id: str              #path to the embeddings store

ask_router = APIRouter()


@ask_router.post('/')
def ask(request: AskRequest):
    try:
        path = request.path
        questions = request.questions
        chat_id = request.chat_id
        db = FAISS.load_local(path, embeddings)
        qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0.5), db.as_retriever(k=2),condense_question_prompt=CUSTOM_QUESTION_PROMPT,return_source_documents=False,memory=chats_memories[chat_id]['memory'])
        result=qa({"question": questions})
        chats_memories[chat_id]['conversation'].append({'message':questions})
        chats_memories[chat_id]['conversation'].append({'type':'chatBot','message':result['answer']})
        db.similarity_search(questions,k=2)
        return {"result": result['answer']}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@ask_router.get('/conversation')
def get_conversation(chat_id:str):
    conversation= chats_memories[chat_id]['conversation']
    data_to_send = {
            "conversation": conversation
    }
    return json.dumps(data_to_send)


@ask_router.get('/sources')
def get_sources(file_path:str,question:str):
    try:
        db = FAISS.load_local(file_path, embeddings)
        sources=db.similarity_search(question,k=2)

        print(sources)
        sources_serializable = jsonable_encoder(sources)
        data_to_send = {
            "sources":sources_serializable
         }
        return json.dumps(data_to_send)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))