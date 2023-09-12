from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers.anonymize_file import anonymize_router
from app.api.routers.process import process_router
from app.api.routers.ask import ask_router
from app.api.routers.new_chat import chat_router



app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(anonymize_router,prefix='/anonymize')
app.include_router(process_router,prefix='/process')
app.include_router(ask_router,prefix='/ask')
app.include_router(chat_router,prefix='/new-chat')

@app.get('/')
def root():
    return {"message":"successfully connected"}
