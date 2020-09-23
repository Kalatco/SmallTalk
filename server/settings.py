from dotenv import load_dotenv
import os

load_dotenv()

# PostgreSQL database credentials and location
POSTGRES_URL = os.getenv("POSTGRES_URL")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PW = os.getenv("POSTGRES_PW")
POSTGRES_DB = os.getenv("POSTGRES_DB")
DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)

# Secret token
SECRET_KEY = os.getenv('SECRET_KEY')

# Amount of time an admin can stay logged in, in minutes.
JWT_TOKEN_EXPIRES = 120
