from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import File
from auth import verify_token
from supabase_files import upload_user_file, get_user_file_url, delete_user_file  # We'll add delete function

router = APIRouter()

# CREATE - Already done in your upload endpoint

# READ Operations
@router.get("/files")
def get_all_user_files(user=Depends(verify_token), db: Session = Depends(get_db)):
    """Get all files for the current user"""
    user_id = int(user["sub"])
    files = db.query(File).filter(File.user_id == user_id).all()
    return files

@router.get("/files/{file_id}")
def get_single_file(file_id: int, user=Depends(verify_token), db: Session = Depends(get_db)):
    """Get a specific file by ID (only if user owns it)"""
    user_id = int(user["sub"])
    file = db.query(File).filter(File.id == file_id, File.user_id == user_id).first()
    
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return file

# UPDATE Operation
from pydantic import BaseModel

class UpdateFileText(BaseModel):
    new_text: str

@router.put("/files/{file_id}")
def update_file_text(
    file_id: int, 
    update_data: UpdateFileText,  # Get from request body
    user=Depends(verify_token), 
    db: Session = Depends(get_db)
):
    """Update the text content of a file"""
    user_id = int(user["sub"])
    
    # Find the file and verify ownership
    file = db.query(File).filter(File.id == file_id, File.user_id == user_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Update the text
    file.text = update_data.new_text  # Get from request body
    db.commit()
    db.refresh(file)
    
    return {"message": "File updated successfully", "file": file}

# DELETE Operation
@router.delete("/files/{file_id}")
def delete_file(file_id: int, user=Depends(verify_token), db: Session = Depends(get_db)):
    """Delete a file from both database and Supabase storage"""
    user_id = int(user["sub"])
    
    # Find the file and verify ownership
    file = db.query(File).filter(File.id == file_id, File.user_id == user_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # 1. Delete from Supabase storage first
    try:
        # We need to add this function to supabase_files.py
        delete_user_file(str(user_id), file.filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete from storage: {str(e)}")
    
    # 2. Delete from database
    db.delete(file)
    db.commit()
    
    return {"message": "File deleted successfully"}