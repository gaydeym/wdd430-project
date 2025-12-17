# LDS Temples - MEAN Stack Application

Application for exploring temples of The Church of Jesus Christ of Latter-day Saints with full CRUD functionality.

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Seed database and start server:
```bash
npm run seed
npm start
```

Backend running at `http://localhost:3000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Application running at `http://localhost:4200`

## MongoDB Connection

**Local:**
```env
MONGODB_URI=mongodb://localhost:27017/lds-temples
```

**Cloud:**
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/lds-temples
```

---

**BYU-Idaho WDD 430 Project**
