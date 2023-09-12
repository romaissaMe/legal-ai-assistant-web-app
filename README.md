# legal-ai-assistant
## anonymize.py
Anonymizing text files by identifying and extracting different types of PII from text data and replacing sensitive information with generic placeholders or pseudonyms using Microsoft Presidio
## utils.py
Helper functions for converting pdf file to txt using pdfplumber and reading from txt files  
## anonymize_test
Running unit tests on anonymize.py using pytest
## installing requirements using pip
pip install -r requirements.txt
## To run the APP locally
  In order to make the full App works on the user's local machine, It's required to launch the api first then running the frontend by executing the scripts below:  
  ### To run the API      
    uvicorn app.api.main:app --reload  
### Commands To Use The API  
- #### /anomymize endpoint  
   curl http://localhost:8000/anonymize -F "file=@tests/example.pdf"        
- #### /ask endpoint  
  curl -X POST -H "Content-Type: application/json" -d '{
    "question": "Your question goes here",
    "text": "Text goes here"
  }' http://localhost:8000/ask
  
 ### To run the frontend   
     cd frontend  
     npm install  
     npm start

## Link to the deployed API  
- https://legalassist.onrender.com
