from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

#DB_URL ="postgresql://amin:amin123@localhost/mydb"
DB_URL = "postgresql://mydb_u8s8_user:sKPP95VntK8IlzQpTYliYvlBdA7GWiUV@dpg-d3fcss49c44c738c2q8g-a.oregon-postgres.render.com/mydb_u8s8"

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False , autoflush = False, bind = engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    """Yield a SQLAlchemy session and ensure it is closed afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
