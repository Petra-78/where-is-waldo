# Where is Everyone?
Where Is Everyone? is a full-stack hidden object game inspired by the classic Where is Waldo game.
Players must find specific characters within a large image as quickly as possible. The game tracks time and stores high scores.

![preview](/frontend/public/images/preview.png)


## Live Demo
https://where-is-everyone.netlify.app/

## Tech Stack

### Backend
* [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)
* [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](#)
* [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](#)
* [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](#)

### Frontend
* 	[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](#)


## Features

* Interactive hidden character search
* Click-based coordinate detection
* Dynamic character selection system
* Real-time game timer
* Final time recorded on a leadeerboard
* Visual feedback for correct/incorrect selections
* Responsive layout

## Installation

Here is how you can start the project locally. 


**1. Clone the repo**
```bash
# HTTPS
git clone https://github.com/Petra-78/where-is-waldo.git

# SSH
git clone git@github.com:Petra-78/where-is-waldo.git
```

**2. Backend setup**
```
$ cd backend
$ npm install  
```

Create `.env`
```bash
DATABASE_URL=
```
Run migrations:
```bash
npx prisma migrate dev
```

Start the backend

`node --watch app.js`

**3. Frontend setup**
```bash
cd frontend
npm install
npm run dev
```

Have fun!
