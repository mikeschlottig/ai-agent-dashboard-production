# AI Agent Dashboard - Production Ready

🚀 **Professional AI Agent Integration Dashboard** with support for 200+ AI models from multiple providers including OpenAI, Anthropic, Google AI, and OpenRouter.

## ✨ Features

### 🤖 **Multi-Provider AI Integration**
- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Anthropic**: Claude 3 Haiku, Sonnet, Opus  
- **Google AI**: Gemini Pro, Gemini Pro Vision
- **OpenRouter**: Access to 200+ models
- **More**: DeepSeek, Mistral AI, and expanding

### 💬 **Real-time Chat System**
- WebSocket-based live chat with Socket.io
- Model switching mid-conversation
- Chat history persistence
- Streaming responses (framework ready)
- System prompt management

### 🔐 **Enterprise Security**
- JWT authentication with bcrypt
- API key encryption (AES-256)
- Rate limiting and CORS protection  
- Input validation and sanitization
- User isolation and role-based access

### 📚 **Knowledge Base & RAG**
- Document upload (PDF, TXT, MD, JSON, CSV)
- Text extraction and search
- RAG-ready architecture
- File type validation
- Metadata management

### 📊 **Analytics & Monitoring**
- Usage statistics by model/provider
- Cost tracking and breakdown
- Performance metrics
- Historical trends
- Export capabilities

### ⚙️ **Developer Experience**
- TypeScript throughout
- Comprehensive logging
- Error handling and validation
- Docker support ready
- API documentation

## 🏗️ Architecture

```
Frontend (React/TypeScript)     Backend (Node.js/Express)     Database (SQLite)
┌─────────────────────────┐    ┌──────────────────────────┐   ┌─────────────────┐
│ • Vite + React 18       │    │ • Express + Socket.io    │   │ • Users         │
│ • TypeScript            │◄──►│ • JWT Authentication     │◄──│ • Chats         │
│ • Tailwind CSS          │    │ • API Key Encryption     │   │ • Messages      │
│ • Zustand State Mgmt    │    │ • Multi-AI Integration   │   │ • Documents     │
│ • Socket.io Client      │    │ • Real-time Chat         │   │ • API Keys      │
│ • React Router          │    │ • File Upload System     │   │ • Analytics     │
└─────────────────────────┘    └──────────────────────────┘   └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/mikeschlottig/ai-agent-dashboard-production.git
cd ai-agent-dashboard-production
```

### 2. Install Dependencies
```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Or install separately:
npm install                    # Backend dependencies
cd frontend && npm install     # Frontend dependencies
```

### 3. Configure Environment
```bash
# Copy and edit environment variables
cp .env.example .env

# Add your AI provider API keys:
# OPENAI_API_KEY=sk-your-openai-key
# ANTHROPIC_API_KEY=sk-ant-your-claude-key
# GOOGLE_API_KEY=your-google-ai-key
# OPENROUTER_API_KEY=sk-or-your-openrouter-key
```

### 4. Start Development Servers
```bash
# Start both backend and frontend concurrently
npm run dev

# Or start separately:
npm run server:dev    # Backend on http://localhost:3001
npm run client:dev    # Frontend on http://localhost:5173
```

### 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📝 Complete API Documentation

### Authentication Endpoints
```
POST /api/auth/register   # Create new user account
POST /api/auth/login      # User login
POST /api/auth/logout     # User logout  
GET  /api/auth/profile    # Get user profile
```

### AI Model Endpoints
```
GET  /api/models          # List available AI models
GET  /api/models/providers # List AI providers
POST /api/models/chat     # Send chat message to AI
```

### Chat Management
```
GET    /api/chats         # Get user's chat history
POST   /api/chats         # Create new chat
GET    /api/chats/:id     # Get specific chat with messages
PUT    /api/chats/:id     # Update chat title/settings
DELETE /api/chats/:id     # Delete chat
```

### Knowledge Base
```
GET    /api/knowledge/documents    # List uploaded documents
POST   /api/knowledge/upload       # Upload new document
POST   /api/knowledge/search       # Search knowledge base
DELETE /api/knowledge/:id          # Delete document
```

### API Key Management
```
GET    /api/api-keys      # Get user's API keys (masked)
POST   /api/api-keys      # Add new API key
PUT    /api/api-keys/:id  # Update API key
DELETE /api/api-keys/:id  # Delete API key
```

### Analytics
```
GET /api/analytics/usage       # Usage statistics
GET /api/analytics/costs       # Cost breakdown
GET /api/analytics/performance # Performance metrics
```

---

**Built with ❤️ by LEVERAGE AI** - Empowering developers with professional AI integration tools.