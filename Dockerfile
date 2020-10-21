###########
# BUILDER #
###########

FROM python:3.8-alpine as builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add python3-dev postgresql-dev gcc libc-dev 
RUN apk add --no-cache libressl-dev musl-dev libffi-dev

RUN pip install --upgrade pip
RUN pip install flake8
COPY . .
RUN flake8 --ignore=E501,F401,E305,E302 .

COPY requirements.txt /app/
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

#########
# FINAL #
#########

FROM python:3.8-alpine

RUN mkdir -p /home/app

RUN addgroup -S app && adduser -S app -G app

ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
WORKDIR $APP_HOME

RUN apk update && apk add libpq python3-dev postgresql-dev gcc libc-dev 
RUN apk add --no-cache libressl-dev musl-dev libffi-dev

COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .
RUN pip install --no-cache /wheels/*

COPY ./entrypoint.sh $APP_HOME

COPY . $APP_HOME

RUN chown -R app:app $APP_HOME

USER app

ENTRYPOINT [ "sh", "/home/app/web/entrypoint.sh"]
