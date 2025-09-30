from fastapi import APIRouter, Depends, UploadFile

from auth import verify_token
from supabase_files import upload_user_file, list_user_files

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile, user = Depends(verify_token)):
    content = await file.read()
    result = upload_user_file(user["sub"], file.filename, content)
    return result


@router.get("/getfiles")
async def list_files(user=Depends(verify_token)):
    return list_user_files(user["sub"])

