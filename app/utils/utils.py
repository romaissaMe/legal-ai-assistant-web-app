import pdfplumber

def read_pdf_file(filename:str):
    text=''
    with pdfplumber.open(filename) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

def read_txt_file(filename:str):
    text=''
    with open(filename,'r')as file:
        text+=file.read()
    return text