from fileinput import filename
from fastapi import APIRouter, Depends, UploadFile, Form
from sqlalchemy.orm import Session
from database import get_db
from models import File


from auth import get_current_user, verify_token
from supabase_files import upload_user_file, list_user_files, get_user_file_url


SUPABASE_URL = "https://jdiqirdposojdofsxvsm.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaXFpcmRwb3NvamRvZnN4dnNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3ODgxNSwiZXhwIjoyMDc0NzU0ODE1fQ.XhtVnVwNBC-PRUOP8jTkmDLePMczubxF5FYrkMq4frM"
BUCKET_NAME = "files"

router = APIRouter()


@router.post("/upload")
async def upload(
    file: UploadFile= UploadFile(...),
    text: str= Form(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
        # 1. Get user_id from token
    user_id = int(current_user["sub"])
    
    # 2. Upload file to Supabase (CORRECT WAY)
    content = await file.read()
    result = upload_user_file(str(user_id), file.filename, content)  # All 3 arguments!
    
    # 3. Construct URL manually instead of calling get_user_file_url()
    file_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{user_id}/{file.filename}"
    
    # 4. Save to database
    new_file = File(
        filename=file.filename,
        text=text,
        url=file_url,
        user_id=user_id
    )
    
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    
    return {
        "message": "File and text uploaded successfully",
        "filename": file.filename,
        "text": text,
        "url": file_url,
        "file_id": new_file.id
    }

@router.get("/getfiles")
async def list_files(user=Depends(verify_token)):
    return list_user_files(user["sub"])

