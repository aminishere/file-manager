# File Manager

A full-stack web application for managing and storing files in the cloud. Built with modern web technologies, it features user authentication, protected routes, and secure file storage using Supabase.

## Features

- **User Authentication**: Secure user registration and login system ( jwt)
- **Cloud Storage**: Store and manage files in the cloud with the user customized tag attached.
- **Protected Routes**: Secure access to application features
- **File Management**: Upload, download, and organize files
- **Real-time Updates**: Instant synchronization with cloud storage

## Tech Stack

### Frontend
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="40" />  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"  width="40" height="40" />
          
          

### Backend
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" width="40" height="40"  /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg" width="40" height="40" />
          

### Database
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" width="40" height="40" />
          

### Project Structure

File Manager/  
│
├── backend/  
│ ├── auth.py  
│ ├── database.py  
│ ├── main.py  
│ ├── models.py  
│ ├── requirements.txt  
│ ├── routers/  
│ ├── schemas.py  
│ ├── security.py  
│ └── supabase_files.py  
│
└── client/  
├── README.md  
├── eslint.config.js  
├── index.html  
├── node_modules/  
├── package-lock.json  
├── package.json  
├── public/  
├── src/  
└── vite.config.js  


### Setup Instructions

```bash
# example
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


