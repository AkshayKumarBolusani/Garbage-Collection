#!/bin/bash

# 🚀 JunkOut Deployment Script
# This script helps automate the deployment process

echo "🗑️ JunkOut - Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_status "Starting deployment process..."

# Initialize Git repository if not already done
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    print_warning "Please add your remote repository: git remote add origin <your-repo-url>"
else
    print_status "Git repository already exists"
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd garbagecollector
if npm install; then
    print_status "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Build frontend
print_status "Building frontend..."
if npm run build; then
    print_status "Frontend built successfully"
else
    print_error "Failed to build frontend"
    exit 1
fi

cd ..

# Install backend dependencies
print_status "Installing backend dependencies..."
cd server
if npm install; then
    print_status "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

cd ..

print_status "Deployment preparation completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub: git push -u origin main"
echo "2. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'garbagecollector'"
echo "3. Deploy backend to Heroku/Railway:"
echo "   - Follow the instructions in DEPLOYMENT.md"
echo ""
echo "📱 Mobile Optimization:"
echo "✅ Responsive design implemented"
echo "✅ Touch-friendly interface"
echo "✅ Mobile navigation menu"
echo "✅ Optimized table scrolling"
echo "✅ No overlapping elements"
echo ""
echo "🔧 Files created:"
echo "✅ .gitignore (root and frontend)"
echo "✅ vercel.json (Vercel configuration)"
echo "✅ README.md (comprehensive documentation)"
echo "✅ DEPLOYMENT.md (deployment guide)"
echo ""
print_status "Deployment script completed successfully!" 