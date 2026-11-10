# AI-Powered Interview Preparation Platform

A full-stack web application that uses Generative AI to help candidates prepare for job interviews through resume analysis, role-specific interview questions, skill-gap identification and personalized preparation plans.

The application processes a candidate's resume alongside a target job description and generates a structured interview report using Google's Gemini API. It also includes an AI-assisted resume PDF generation workflow.

## Features

- **Resume Analysis:** Upload a PDF resume and extract its content for analysis.
- **Job Description Analysis:** Evaluate candidate information in the context of a specific job role.
- **Match Score:** Generate a compatibility score between the candidate's profile and the target role.
- **Technical Interview Questions:** Generate role-specific technical questions with interviewer intent and suggested answers.
- **Behavioral Interview Questions:** Prepare for behavioral interviews with structured questions and answer guidance.
- **Skill Gap Analysis:** Identify missing or insufficiently demonstrated skills and classify them by severity.
- **Preparation Roadmap:** Generate a day-wise preparation plan with learning objectives and actionable tasks.
- **Resume PDF Generation:** Generate a job-tailored resume in PDF format using AI-generated HTML.
- **User Authentication:** Support registration, login, logout and authenticated user sessions.
- **Report Management:** Save, retrieve and access previously generated interview reports.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 19 |
| Build Tool | Vite |
| Styling | SCSS |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js |
| API Framework | Express.js 5 |
| Database | MongoDB |
| ODM | Mongoose |
| AI Integration | Google Gemini API |
| Authentication | JSON Web Token (JWT) |
| Password Hashing | bcryptjs |
| PDF Extraction | pdf-parse |
| PDF Generation | Puppeteer |
| File Upload | Multer |
| Schema Validation | Zod |
| AI Schema Conversion | zod-to-json-schema |
| Middleware | CORS, Cookie Parser |
| Version Control | Git |

## Application Architecture

The application follows a client-server architecture. The React frontend communicates with the Express backend through REST APIs. The backend handles authentication, file processing, AI requests and database operations.

```text
                   CLIENT
                     |
                     v
              REACT FRONTEND
               (Vite + SCSS)
                     |
                     | Axios / HTTP
                     v
              EXPRESS BACKEND
                     |
          +----------+----------+
          |          |          |
          v          v          v
     AUTHENTICATION  FILE     DATABASE
       JWT / bcrypt  UPLOAD   MongoDB
          |          |
          |          v
          |      PDF EXTRACTION
          |       pdf-parse
          |          |
          |          v
          |      GEMINI API
          |          |
          |    +-----+------+
          |    |     |      |
          |    v     v      v
          |  MATCH  SKILL  INTERVIEW
          |  SCORE  GAPS   QUESTIONS
          |    |     |      |
          |    +-----+------+
          |          |
          |          v
          |    PREPARATION PLAN
          |          |
          +----------+
                     |
                     v
              INTERVIEW REPORT
                     |
                     v
                MONGODB
                     |
                     v
             RESUME GENERATION
                  PUPPETEER
                     |
                     v
                PDF OUTPUT
```

## Project Structure

```text
GenAI Project/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src/
│       ├── app.js
│       │
│       ├── config/
│       │   └── database.js
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── file.middleware.js
│       │
│       ├── models/
│       │   ├── user.model.js
│       │   ├── blacklist.model.js
│       │   └── interviewReport.model.js
│       │
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       │
│       └── services/
│           └── ai.service.js
│
├── Frontend/
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── app.routes.jsx
│       │   │
│       │   ├── features/
│       │   │   └── auth/
│       │   │       ├── pages/
│       │   │       ├── services/
│       │   │       ├── hooks/
│       │   │       ├── context/
│       │   │       └── interview/
│       │   │
│       │   └── style/
│       │
│       ├── index.html
│       ├── vite.config.js
│       ├── package.json
│       └── package-lock.json
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure the following are installed and configured:

- Node.js and npm
- MongoDB or a MongoDB Atlas cluster
- Google Gemini API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-interview-preparation-platform.git
```

Navigate into the project directory:

```bash
cd ai-interview-preparation-platform
```

### 2. Backend Configuration

Navigate to the backend directory:

```bash
cd Backend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the `Backend` directory.

Configure the following environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your actual credentials.

Start the backend development server:

```bash
npm run dev
```

The backend will be available at:

`http://localhost:3000`

### 3. Frontend Configuration

Open a separate terminal and navigate to the frontend application:

```bash
cd Frontend/frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

`http://localhost:5173`

Open the URL in your browser to access the application.

## API Reference

All API endpoints are served through the Express backend.

### Authentication

Base route: `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Authenticate an existing user | Public |
| GET | `/logout` | Log out and blacklist the token | Public |
| GET | `/get-me` | Retrieve authenticated user details | Protected |

### Interview Management

Base route: `/api/interview`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/` | Generate an interview report | Protected |
| GET | `/` | Retrieve all interview reports for the logged-in user | Protected |
| GET | `/report/:interviewId` | Retrieve a specific interview report | Protected |
| POST | `/resume/pdf/:interviewReportId` | Generate a tailored resume PDF | Protected |

### Interview Report Request

**Endpoint:** `POST /api/interview/`

**Content-Type:** `multipart/form-data`

Request parameters:

| Parameter | Type | Description |
|---|---|---|
| resume | File (PDF) | Candidate's resume |
| jobDescription | String | Target job description |
| selfDescription | String | Additional candidate information |

The backend extracts the uploaded PDF content, processes the information using Gemini and saves the generated report in MongoDB.

### Generated Interview Report

The AI service returns a structured JSON response containing:

| Field | Description |
|---|---|
| `title` | Target job title |
| `matchScore` | Candidate-job compatibility score |
| `technicalQuestions` | Technical questions, interviewer intent and suggested answers |
| `behavioralQuestions` | Behavioral questions, interviewer intent and suggested answers |
| `skillGaps` | Identified skills and their severity |
| `preparationPlan` | Day-wise preparation objectives and tasks |

## AI Integration

The application uses Google's Gemini API through the official `@google/genai` SDK.

The interview report generation workflow uses structured JSON output based on a Zod-defined schema. The generated response is parsed and stored as an interview report.

### Processing Workflow

1. The user uploads a PDF resume.
2. Multer handles the uploaded file in memory.
3. pdf-parse extracts the resume text.
4. The backend combines the extracted resume content, self-description and job description.
5. Google Gemini generates the interview report.
6. The response is structured using the defined Zod schema.
7. The report is stored in MongoDB and associated with the authenticated user.

### Resume PDF Generation

The resume generation workflow uses Gemini to generate HTML content tailored to the target job description.

Puppeteer then renders the HTML and converts it into an A4 PDF document, which is returned to the client as a downloadable file.

## Database Models

The application uses MongoDB with Mongoose for data persistence.

The primary data models are:

- **User:** Stores username, email and hashed password.
- **InterviewReport:** Stores resume content, job description, candidate description, match score, interview questions, skill gaps and preparation plan.
- **TokenBlacklist:** Stores invalidated authentication tokens during logout.

Interview reports are associated with individual users, allowing authenticated users to retrieve their own reports.

## Security and Configuration

- Passwords are hashed using bcryptjs before being stored.
- JWT is used for user authentication.
- Authentication tokens are maintained through HTTP cookies.
- Protected routes use authentication middleware.
- Logged-out tokens are checked against a blacklist.
- Resume uploads are processed using Multer memory storage.
- API credentials and database connection strings are maintained in environment variables.

Do not commit `.env` files, database credentials or API keys to version control.

## Development

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

```bash
cd Frontend/frontend
npm run dev
```

The backend currently uses port `3000`, while the frontend development server uses port `5173`.

The frontend API client is configured to communicate with `http://localhost:3000`, and the backend CORS configuration allows the local Vite development origin.

## Planned Improvements

- Interactive AI-powered mock interviews.
- ATS-based resume evaluation.
- Advanced resume optimization.
- Interview performance tracking.
- Voice-based interview simulations.
- Personalized learning recommendations.
- Expanded analytics and reporting.
- Production deployment and automated testing.

## License

No open-source license has been added to this repository. All rights are reserved by the repository owner unless a license is specified.

---

**AI-Powered Interview Preparation Platform**  
Developed using React, Node.js, MongoDB and Google Gemini.