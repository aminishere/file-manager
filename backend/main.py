from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# 1
engine = create_engine("postgresql+psycopg2://amin:amin123@localhost/sample2")

# 2
Base = declarative_base()

# 3
class User(Base):
    __tablename__ = 'users'   # table name
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    age = Column(Integer)

# 4
Base.metadata.create_all(engine)

# 5
Session = sessionmaker(bind=engine)
session = Session()

# 6
session.add(User(name="Alice", age=25))
session.commit()

# 7
for user in session.query(User).all():
    print(user.id, user.name, user.age)

# 8
session.close()
