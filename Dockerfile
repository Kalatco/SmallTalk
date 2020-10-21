FROM python:3.8-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add python3-dev postgresql-dev gcc libc-dev 
RUN apk add --no-cache libressl-dev musl-dev libffi-dev

RUN pip install --upgrade pip
COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY entrypoint.sh .

COPY . .

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
