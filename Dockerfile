FROM python:3.10.4-slim-buster

# set working directory
WORKDIR /app
RUN mkdir static/ && mkdir media/

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && \
  apt-get -y install netcat gcc

# copy all files
COPY . .

# install python dependencies
RUN pip install -r requirements.txt
