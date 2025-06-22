# 🗑️ JunkOut - Garbage Collection Management System

A modern, full-stack web application for managing garbage collection services with a focus on environmental sustainability and user experience.

## 📁 Project Structure

```
GarbageCollecton/
├── garbagecollector/     # React Frontend
│   ├── public/           # Static files
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── context/      # React context
│   │   └── ...
│   ├── package.json      # Frontend dependencies
│   └── vercel.json       # Vercel deployment config
├── server/               # Node.js Backend
│   ├── App.js           # Express server
│   ├── mongo.js         # Database models
│   └── package.json     # Backend dependencies
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone and Setup
```bash
git clone <repository-url>
cd GarbageCollecton
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd garbagecollector
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Configure Environment
Update the MongoDB connection string in `server/mongo.js`:
```javascript
mongoose.connect("your-mongodb-connection-string");
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd garbagecollector
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001

## 📱 Mobile-First Design

The application is built with mobile-first responsive design:

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Mobile Optimizations
- Touch-friendly interface
- Optimized table scrolling with horizontal scroll
- Responsive grid layouts
- Adaptive font sizes
- Mobile-optimized forms
- No overlapping elements
- Proper spacing and padding

## 🌐 Deployment Ready

### Frontend (Vercel)
- ✅ `vercel.json` configured for React Router
- ✅ Responsive design optimized
- ✅ Build optimization ready
- ✅ Environment variables support

### Backend (Multiple Options)
- ✅ Heroku ready
- ✅ Railway ready  
- ✅ DigitalOcean ready
- ✅ AWS ready

## 🛠️ Features

### 🔐 Authentication System
- Secure user registration/login
- JWT token-based authentication
- Protected routes

### 🗑️ Garbage Collection
- Online booking system
- Multiple waste types
- Real-time validation
- Booking history

### 👥 Driver Management
- Add/view drivers
- Performance tracking
- Status management

### 📋 Complaint System
- Submit complaints
- Status tracking
- Multiple categories

### 📊 Analytics
- Collection statistics
- Filterable data
- Privacy-focused display

## 🎨 Design System

### Color Theme
- **Primary**: Green (#4CAF50) - Environmental focus
- **Secondary**: Dark Green (#2E7D32)
- **Background**: Light Green (#e8f5e8)
- **Text**: Dark Gray (#2c3e50)

### Typography
- **Font**: Poppins (Google Fonts)
- **Responsive**: Scales across all devices

### Components
- Glass morphism effects
- Gradient backgrounds
- Smooth animations
- Hover effects

## 📦 Technology Stack

### Frontend
- React.js 18
- Styled Components
- React Router v6
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | User registration |
| POST | `/login` | User authentication |
| POST | `/submit-garbage-collection` | Submit collection request |
| GET | `/garbage-history` | Get collection history |
| POST | `/add-driver` | Add new driver |
| GET | `/view-drivers` | Get all drivers |
| POST | `/add-complaint` | Submit complaint |
| GET | `/view-complaints` | Get all complaints |
| POST | `/add-work-report` | Add work report |
| GET | `/view-work-reports` | Get all work reports |

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Heroku)
1. Create Heroku app
2. Connect MongoDB Atlas
3. Deploy with Git

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- Email: akshaykumar@gmail.com
- Phone: +91 7396991624
- WhatsApp: +91 7396991624

---

**Built with ❤️ for a cleaner environment** 