# main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import SessionLocal, init_db
from models import User
from schemas import UserCreate, UserLogin

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI()

init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- PASSWORD UTILITIES ----------------

def truncate_bcrypt(password: str, limit: int = 72) -> str:
    encoded = password.encode("utf-8")
    if len(encoded) <= limit:
        return password
    # truncate without breaking multi-byte char
    truncated = encoded[:limit]
    while True:
        try:
            return truncated.decode("utf-8")
        except UnicodeDecodeError:
            truncated = truncated[:-1]


def get_password_hash(password: str) -> str:
    safe_pass = truncate_bcrypt(password)
    return pwd_context.hash(safe_pass)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    safe_pass = truncate_bcrypt(plain_password)
    return pwd_context.verify(safe_pass, hashed_password)

# ---------------- ROUTES ----------------

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if len(user.password.encode("utf-8")) > 72:
        raise HTTPException(status_code=400, detail="Password too long (max 72 bytes)")

    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, name=user.name, hash_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": {"email": new_user.email, "name": new_user.name}}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password, db_user.hash_password):
        raise HTTPException(status_code=400, detail="Wrong password")

    return {"msg": "Login successful", "user": {"email": db_user.email, "name": db_user.name}}
