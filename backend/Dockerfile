FROM python:3.9

COPY ./requirements.txt /application/requirements.txt

COPY ./app /application/app

WORKDIR /application

RUN pip install --no-cache-dir -r /application/requirements.txt

CMD [ "uvicorn","app.api.main:app","--host","0.0.0.0"]
