from supabase import create_client

SUPABASE_URL = "https://jdiqirdposojdofsxvsm.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaXFpcmRwb3NvamRvZnN4dnNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3ODgxNSwiZXhwIjoyMDc0NzU0ODE1fQ.XhtVnVwNBC-PRUOP8jTkmDLePMczubxF5FYrkMq4frM"
BUCKET_NAME = "files"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_user_file(user_id: str, filename: str, content: bytes):
    """Upload file to Supabase under user's folder."""
    path = f"{user_id}/{filename}"
    try:
        # upload returns an UploadResponse object
        supabase.storage.from_(BUCKET_NAME).upload(path, content)
        return {"message": "File uploaded successfully!"}
    except Exception as e:
        return {"error": str(e)}

def get_user_file_url(user_id: str, filename: str, expires_in=3600):
    """Get signed URL to download a user's file."""
    path = f"{user_id}/{filename}"
    try:
        signed_url = supabase.storage.from_(BUCKET_NAME).create_signed_url(path, expires_in)
        # New client returns dict like {'signed_url': '...'}
        return {"url": signed_url["signed_url"]}
    except Exception as e:
        return {"error": str(e)}
    
def list_user_files(user_id: str):
    try:
        files = supabase.storage.from_(BUCKET_NAME).list(path=user_id)
        return {"files": files}
    except Exception as e:
        return {"error": str(e)}    

def delete_user_file(user_id: str, filename: str):
    """Delete file from Supabase storage"""
    path = f"{user_id}/{filename}"
    try:
        result = supabase.storage.from_(BUCKET_NAME).remove([path])
        return {"message": "File deleted from storage"}
    except Exception as e:
        return {"error": str(e)}