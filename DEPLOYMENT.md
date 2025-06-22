# 🚀 Deployment Guide

This guide will help you deploy the JunkOut garbage collection application to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- Heroku/Railway account (for backend)
- MongoDB Atlas account

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare the Repository

```bash
# Initialize Git repository (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `garbagecollector`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3. Environment Variables

Add these environment variables in Vercel:

```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## 🔧 Backend Deployment (Heroku)

### 1. Prepare the Backend

```bash
cd server
```

### 2. Create Heroku App

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add MongoDB Atlas addon
heroku addons:create mongolab:sandbox
```

### 3. Update MongoDB Connection

Update `server/mongo.js` to use environment variables:

```javascript
const MONGODB_URI = process.env.MONGODB_URI || "your-local-mongodb-uri";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```

### 4. Add Procfile

Create `server/Procfile`:

```
web: node App.js
```

### 5. Deploy to Heroku

```bash
# Add all files
git add .

# Commit changes
git commit -m "Prepare for Heroku deployment"

# Deploy
git push heroku main

# Open the app
heroku open
```

## 🔧 Backend Deployment (Railway)

### 1. Prepare the Backend

```bash
cd server
```

### 2. Create Railway Project

1. **Go to [Railway](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Set root directory to `server`**

### 3. Environment Variables

Add these in Railway dashboard:

```
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=8001
```

### 4. Deploy

Railway will automatically deploy when you push to GitHub.

## 🔧 Backend Deployment (DigitalOcean)

### 1. Create Droplet

1. **Create a new Ubuntu droplet**
2. **Connect via SSH**

### 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install MongoDB (optional, or use Atlas)
sudo apt install mongodb
```

### 3. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd GarbageCollecton/server

# Install dependencies
npm install

# Set environment variables
export MONGODB_URI="your-mongodb-connection-string"
export PORT=8001

# Start with PM2
pm2 start App.js --name "junkout-backend"
pm2 startup
pm2 save
```

### 4. Configure Nginx

```bash
# Install Nginx
sudo apt install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/junkout
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/junkout /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Backend Deployment (AWS)

### 1. Create EC2 Instance

1. **Launch EC2 instance (Ubuntu)**
2. **Configure security groups (port 8001)**
3. **Connect via SSH**

### 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 3. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd GarbageCollecton/server

# Install dependencies
npm install

# Set environment variables
export MONGODB_URI="your-mongodb-connection-string"
export PORT=8001

# Start with PM2
pm2 start App.js --name "junkout-backend"
pm2 startup
pm2 save
```

## 🔐 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=8001
JWT_SECRET=your-secret-key
```

## 📱 Mobile Optimization Checklist

- ✅ Responsive design for all screen sizes
- ✅ Touch-friendly interface
- ✅ Optimized table scrolling
- ✅ Mobile navigation menu
- ✅ Proper font scaling
- ✅ No overlapping elements
- ✅ Fast loading times

## 🔍 Post-Deployment Checklist

### Frontend
- [ ] All pages load correctly
- [ ] Navigation works on mobile
- [ ] Forms are responsive
- [ ] API calls work
- [ ] Authentication flows work

### Backend
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] CORS is configured
- [ ] Environment variables are set
- [ ] Logs are accessible

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Add your frontend URL to CORS configuration
   - Update `server/App.js` CORS settings

2. **MongoDB Connection Issues**
   - Check connection string
   - Verify network access
   - Check IP whitelist

3. **Build Failures**
   - Check Node.js version
   - Verify all dependencies
   - Check for syntax errors

4. **Mobile Issues**
   - Test on different devices
   - Check viewport meta tag
   - Verify responsive breakpoints

## 📞 Support

For deployment issues:
- Email: akshaykumar@gmail.com
- Phone: +91 7396991624

---

**Happy Deploying! 🚀** 