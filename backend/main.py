from fastapi import FastAPI

from database import init_db
from routers.auth_routes import router as auth_router
from routers.files_routes import router as files_router
from routers.files_crud import router as files_crud_router


app = FastAPI()

init_db()

# Include routers to keep main minimal
app.include_router(auth_router)
app.include_router(files_router)
app.include_router(files_crud_router)

