from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

DB_URL ="postgresql://amin:amin123@localhost/mydb"

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False , autoflush = False, bind = engine)

def init_db():
    Base.metadata.create_all(bind=engine)
