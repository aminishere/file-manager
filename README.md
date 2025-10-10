# File Manager

A full-stack web application for managing and storing files in the cloud. Built with modern web technologies, it features user authentication, protected routes, and secure file storage using Supabase.

## Features

- **User Authentication**: Secure user registration and login system ( jwt)
- **Cloud Storage**: Store and manage files in the cloud with the user customized tag attached.
- **Protected Routes**: Secure access to application features
- **File Management**: Upload, download, and organize files
- **Real-time Updates**: Instant synchronization with cloud storage

## Tech Stack


<div align = 'center'> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="40" />  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"  width="40" height="40" />  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" width="40" height="40"  /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" width="40" height="40" /></div>
          

## Project Structure

File-Manager/  
│
├── client/  
│   ├── src/  
│   ├── public/  
│   ├── index.html  
│   ├── package.json  
│   ├── package-lock.json  
│   ├── eslint.config.js  
│   └── vite.config.js  
├── backend/  
│   ├── main.py  
│   ├── auth.py  
│   ├── database.py  
│   ├── models.py  
│   ├── schemas.py  
│   ├── security.py  
│   ├── supabase_files.py  
│   ├── routers/  
│   └── requirements.txt  
└── README.md  

## API Endpoints List
| Method | Endpoint       | Description          
|--------|----------------|--------------------|
| POST    | /signup        | register user      | 
| POST    | /login    | Login User     | 
| GET   | /files       | List all files uploaded     | 
| GET    | /files/{file_id}    | list the file with the same file_id      | 
| PUT | /files/{file_id}    | update the file      | 
| DELETE | /files/{file_id}    | delete the file      | 
| POST | /upload    | create a row in database      | 

## Database Tables ( PostgreSQL)

### Users Table

| Column    | Type         | Key         | Description          |
|-----------|-------------|------------|--------------------|
| id        | INT         | PK         | Unique user ID      |
| name      | VARCHAR(100)|            | User's name         |
| email     | VARCHAR(100)|            | User's email        |

### Files Table

| Column     | Type         | Key         | Description                     |
|------------|-------------|------------|--------------------------------|
| id         | INT         | PK         | Unique file ID                  |
| user_id    | INT         | FK -> users.id | Owner of the file              |
| filename   | VARCHAR(255)|            | File name               |
| file_path  | TEXT        |            | Supabase URL             |
| text | STRING   |            | custom tag of each files uploaded               |


## Setup Instructions

```bash
git clone https://github.com/aminishere/file-manager
cd file-manager
```
#### backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
#### frontend
```bash
cd ../client
npm install
npm run dev
```

### testing credentials

Use the following demo credentials:


```txt
Email:    test2@gmail.com
Password: test2


(pls have patience while its loading (render server gets down after a while)) 
```



