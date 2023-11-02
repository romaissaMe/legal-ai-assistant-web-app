import os
import shutil
from fastapi import APIRouter, File, UploadFile
from app.utils.utils import read_pdf_file


anonymize_router = APIRouter()

@anonymize_router.post("/")
async def anonymize(file:UploadFile=File(...)):
    upload_dir = os.path.join(os.getcwd(), "uploads")
    anonymized_dir = os.path.join(os.getcwd(), "anonymized")
    # Create the upload directory if it doesn't exist
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    # get the destination path
    dest = os.path.join(upload_dir,file.filename)
    # copy the file contents to pdf file in destination dest (uploads/filename)
    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    text_anonymized=read_pdf_file(dest)

    if not os.path.exists(anonymized_dir):
        os.makedirs(anonymized_dir)
    
    fileName= os.path.splitext(file.filename)[0]
    anonymize_dest = os.path.join(anonymized_dir,f"{fileName}.{'txt'}")

    with open(anonymize_dest,'w',encoding='utf-8')as file:
        file.write(text_anonymized)
    
    print("anonymize_dest:", anonymize_dest)
    print("dest:", dest)


    return {"anonymized-content":text_anonymized,'path':anonymize_dest}
