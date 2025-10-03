from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from routers.auth_routes import router as auth_router
from routers.files_routes import router as files_router
from routers.files_crud import router as files_crud_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","https://file-manager-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

# Include routers to keep main minimal
app.include_router(auth_router)
app.include_router(files_router)
app.include_router(files_crud_router)

