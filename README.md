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
  
 ### To run the frontend   
     cd frontend  
     yarn install  
     yarn start

## Link to the deployed API  
- https://legalassist.onrender.com
![image](https://github.com/romaissaMe/legal-ai-assistant-web-app/assets/95141338/1f1d6766-7280-41c6-a9c5-b3ad32426545)
![image](https://github.com/romaissaMe/legal-ai-assistant-web-app/assets/95141338/a7bec649-ea6c-407c-97c2-cb30a0c2e82b)
![image](https://github.com/romaissaMe/legal-ai-assistant-web-app/assets/95141338/555162e9-32ec-44e1-873b-1a72f55c7398)
![image](https://github.com/romaissaMe/legal-ai-assistant-web-app/assets/95141338/073a02da-ff6b-4f35-80c5-fc1afc14d9bf)

