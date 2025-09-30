from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin
from auth import create_access_token, get_current_user
from security import get_password_hash, verify_password

router = APIRouter()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, name=user.name, hash_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": {"email": new_user.email, "name": new_user.name}}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password, db_user.hash_password):
        raise HTTPException(status_code=400, detail="Wrong password")

    access_token = create_access_token(data={"sub": str(db_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"msg": f"Hello {current_user}, you are authorized!"}

