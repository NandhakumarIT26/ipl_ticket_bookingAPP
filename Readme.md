# IPL Ticket Booking System

## 📌 Project Overview
The **IPL Ticket Booking System** is a full-stack web application that allows users to **search, book, and manage IPL tickets** while providing **admin controls** for match management.

## 🚀 Features
### **User Features**
✅ Register/Login using JWT authentication  
✅ View available IPL matches  
✅ Book tickets for matches  
✅ View booking history  
✅ Cancel active bookings  
✅ Search for matches *(optional)*  

### **Admin Features**
✅ Create, edit, and delete matches  
✅ View all user bookings  
✅ Perform all user actions  

### **Restricted Actions**
❌ Users cannot modify match details or other people's bookings  
❌ Admins cannot modify/delete user bookings  

---

## 🛠️ Tech Stack
### **Frontend:**
- Vite + React.js
- Tailwind CSS

### **Backend:**
- Node.js with Express.js
- Sequelize ORM

### **Database:**
- MySQL (running in Docker)

### **Cloud & Deployment:**
- AWS (EC2 for backend, S3 for frontend, RDS for MySQL)

---

## 🏗️ Project Structure
```
ipl-ticket-booking/
├── backend/  (Node.js + Express)
│   ├── controllers/    # Handles business logic
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   ├── middleware/     # JWT authentication
│   ├── config/         # Database connection
│   ├── server.js       # Express app entry point
│   ├── .env            # Environment variables
│   └── package.json    # Backend dependencies
│
├── frontend/  (Vite + React)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Pages (Home, Login, Matches)
│   │   ├── api/         # API calls
│   │   ├── App.js       # Main component
│   │   └── index.js     # Entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
│
├── database/  (MySQL in Docker)
│   ├── init.sql         # Schema creation script
│   ├── docker-compose.yml # Docker setup
│
└── README.md            # Project documentation
```

---

## 🏃‍♂️ Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/ipl-ticket-booking.git
cd ipl-ticket-booking
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
cp .env.example .env  # Set up environment variables
node server.js  # Start backend
```

### **3️⃣ Setup Frontend**
```sh
cd frontend
npm install
npm run dev  # Start frontend
```

### **4️⃣ Setup MySQL in Docker**
```sh
docker-compose up -d  # Starts MySQL container
```

---

## 🌍 API Endpoints
### **Authentication Routes** (`/api/auth`)
- `POST /register` → Register a new user
- `POST /login` → User login

### **Match Routes** (`/api/matches`)
- `GET /` → Get all matches
- `POST /create` → Create a match *(Admin only)*
- `PUT /update/:matchId` → Update a match *(Admin only)*
- `DELETE /delete/:matchId` → Delete a match *(Admin only)*

### **Booking Routes** (`/api/bookings`)
- `POST /book` → Book a ticket
- `GET /history` → Get user's booking history
- `DELETE /cancel/:bookingId` → Cancel a booking

---

## 📜 Environment Variables (`.env`)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=msec@123
DB_NAME=ipl_ticket_booking
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

---

## 🚀 Deployment
### **Backend on AWS EC2**
```sh
scp -r backend/ ec2-user@your-aws-ip:/home/ec2-user/ipl-backend
ssh ec2-user@your-aws-ip
cd ipl-backend
npm install
node server.js
```

### **Frontend on AWS S3**
```sh
cd frontend
npm run build
aws s3 sync dist/ s3://your-s3-bucket-name/
```

---

## 🎯 To-Do List
- ✅ Complete Backend Development
- ✅ Setup Frontend UI
- ✅ Integrate with AWS
- ⏳ Implement Payment Gateway *(Future Update)*

---

## 📝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a **Pull Request**

---

## 📩 Contact
If you have any questions, feel free to reach out:
📧 Email: your.email@example.com  
💼 LinkedIn: [your-linkedin](https://linkedin.com/in/yourprofile)  
🚀 GitHub: [yourusername](https://github.com/yourusername)

---

### 🔥 Made with ❤️ for IPL Fans!

