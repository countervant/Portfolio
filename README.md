# Peejay David - Portfolio (Decoupled Client/Server Architecture)

A modern, responsive personal portfolio built with a decoupled architecture featuring a **React (Vite)** frontend and an **Express.js** backend API with secure email dispatching, input validation, and spam rate limiting.

---

## 📁 Repository Structure

```text
portfolio/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static public assets (favicons, logos)
│   ├── src/                    # React source code
│   │   ├── assets/             # Images, project screenshots
│   │   ├── components/         # Modular UI components (Hero, About, Projects, Contact, etc.)
│   │   ├── App.jsx             # Main application component
│   │   ├── data.js             # Content and project data
│   │   └── main.jsx            # React root entry
│   ├── .env.example            # Example frontend environment variables
│   ├── .oxlintrc.json          # Oxlint configuration
│   ├── package.json            # Frontend dependencies and build scripts
│   └── vite.config.js          # Vite config with dev proxy to backend
│
├── server/                     # Backend API (Express.js)
│   ├── src/
│   │   ├── controllers/        # Route controllers (contact submission)
│   │   ├── middleware/         # Validation, sanitization, rate-limiter, honeypot
│   │   ├── routes/             # Express API routes (/api/contact, /api/health)
│   │   ├── services/           # Email service (Resend / SMTP / Nodemailer / Dev Mock)
│   │   └── app.js              # Express application configuration & CORS
│   ├── tests/                  # Integration & endpoint test suite
│   ├── .env.example            # Example backend environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Server entry point
│
├── .github/
│   └── workflows/
│       └── deploy-aws.yml      # CI/CD deployment workflow to AWS S3 & CloudFront
├── package.json                # Root monorepo scripts & workspaces
└── .gitignore                  # Git ignore rules
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: `v20+` or `v22+`
- **npm**: `v9+`

### 2. Install Dependencies
Install all workspace dependencies across root, client, and server with one command:
```bash
npm install
```

### 3. Configure Environment Variables

#### Frontend (`client/.env`)
Copy the template:
```bash
cp client/.env.example client/.env
```
*(During local development, `VITE_API_URL` can be left empty because Vite's proxy automatically routes `/api` requests to `http://localhost:5000`)*.

#### Backend (`server/.env`)
Copy the template:
```bash
cp server/.env.example server/.env
```

Configure your email credentials in `server/.env`:
- **Option A: Resend (Recommended)**
  ```env
  EMAIL_PROVIDER=resend
  RESEND_API_KEY=re_your_resend_api_key
  RESEND_FROM="Portfolio Contact <onboarding@resend.dev>"
  EMAIL_TO=davidpeejay@gmail.com
  ```
- **Option B: Nodemailer (SMTP / Gmail App Password)**
  ```env
  EMAIL_PROVIDER=smtp
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=your_email@gmail.com
  SMTP_PASS=your_gmail_app_password
  EMAIL_FROM="Portfolio Contact" <your_email@gmail.com>
  EMAIL_TO=davidpeejay@gmail.com
  ```
- **Option C: Mock / Simulated Mode**
  - If no credentials are configured, the server automatically runs in **Mock mode**, logging the formatted email to the console so local development never breaks.

---

### 4. Start Development Servers

Run both the frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📬 Contact Form & API Features

### 1. `POST /api/contact`
- **Input Validation**: Ensures valid email format, string sanitization, and reasonable character lengths.
- **Honeypot Bot Protection**: Hidden field traps spam bots and silently acknowledges without dispatching email.
- **Rate Limiting**: Limits submissions per IP address (5 submissions per 15 minutes) to protect your inbox and API quotas.
- **Dynamic Frontend UI States**:
  - Disabled inputs & loading spinner when sending.
  - Success banner upon successful dispatch.
  - Error alert with helpful message if submission fails.
  - Auto-resets form on success.

---

## 🛠️ Monorepo Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts both client (`5173`) and server (`5000`) concurrently |
| `npm run dev:client` | Starts Vite dev server for the frontend |
| `npm run dev:server` | Starts Express backend in watch mode |
| `npm run build` | Builds the React frontend for production (`client/dist/`) |
| `npm run lint` | Runs `oxlint` on the frontend codebase |
| `npm run test:api` | Runs integration tests for the backend API |
| `npm run start` | Starts the production Express server |

---

## 🧪 Testing

To run the automated test suite verifying endpoints, validation, honeypot spam traps, and error handlers:
```bash
npm run test:api
```
