FROM python:3.8.3-slim-buster

# set working directory
ENV HOME=/usr/src/app
RUN mkdir $HOME
RUN mkdir $HOME/static
RUN mkdir $HOME/media
WORKDIR $HOME

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc \
  && apt-get clean

# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# add app
COPY . .
