<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

# JobLeap

A modern, full-stack job search platform that connects job seekers with opportunities worldwide. Built with React 19, Node.js, and MongoDB, JobLeap aggregates job listings from multiple sources and provides powerful tools to streamline the job search process.

## Features

### For Job Seekers
- **Smart Job Search** - Search and filter jobs by title, location, company, and job type
- **Multi-Source Aggregation** - Jobs fetched from multiple APIs including JoinRise and Adzuna
- **Application Tracking** - Track all your job applications in one place with status updates
- **ATS Resume Checker** - AI-powered resume analysis using Groq's Llama 3.3 70B model to optimize your resume for Applicant Tracking Systems
- **Resume Builder** - Create professional resumes with a guided builder
- **Career Advice** - Curated articles and tips from industry experts via Dev.to integration
- **Company Reviews** - Research companies with aggregated review data from Glassdoor and Indeed

### For Employers
- **Job Posting** - Create and manage job listings with detailed descriptions
- **Applicant Management** - View and manage applications for posted positions
- **Dashboard** - Track job performance and applicant statistics

### Platform Features
- **Google OAuth Integration** - Seamless sign-in with Google accounts
- **Role-Based Access** - Separate experiences for job seekers and employers
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Secure Authentication** - JWT-based auth with password hashing

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Vite | Build tool & dev server |
| Axios | HTTP client |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Passport.js | Authentication middleware |
| JWT | Token-based authentication |
| Groq SDK | AI-powered resume analysis |
| Helmet | Security headers |
| Express Rate Limit | API rate limiting |

### External APIs
- **JoinRise API** - Job listings aggregation
- **Adzuna API** - Additional job sources
- **Dev.to API** - Career advice articles
- **Google OAuth 2.0** - Social authentication

## Project Structure

```
jobleap/
├── Client/                    # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── Hero.jsx       # Landing page hero
│   │   │   ├── JobCard.jsx    # Job listing card
│   │   │   ├── JobDetails.jsx # Job details view
│   │   │   ├── ResumeBuilder.jsx
│   │   │   ├── ATSCheckModal.jsx
│   │   │   └── ...
│   │   ├── context/           # React context providers
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── api/                   # Vercel serverless functions
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   └── bookmarkController.js
│   ├── middleware/            # Express middleware
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Bookmark.js
│   ├── routes/                # API routes
│   ├── server.js              # Express server
│   └── package.json
│
└── docker-compose.yml         # Docker configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database (local or Atlas)
- Google OAuth credentials (for social login)
- Groq API key (for ATS checker)
- Adzuna API credentials (for job listings)

### Environment Variables

Create `.env` files in both `Client/` and `server/` directories:

**Server `.env`:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GROQ_API_KEY=your_groq_api_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
CLIENT_URL=http://localhost:5173
```

**Client `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tejas160920/JobLeap.git
   cd jobleap
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../Client
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start backend (from server directory)
   npm run dev

   # Start frontend (from Client directory)
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Docker Deployment

```bash
docker-compose up --build
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/me` | Get current user |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get job by ID |
| POST | `/api/jobs` | Create job (employer) |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get user applications |
| POST | `/api/applications` | Submit application |
| PUT | `/api/applications/:id` | Update application status |

### ATS Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ats/analyze` | Analyze resume against job |

## Deployment

The application is configured for deployment on:
- **Frontend**: Vercel
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas

## License

This project is licensed under the ISC License.

## Author

**Tejas** - [GitHub](https://github.com/Tejas160920)

---

<p align="center">
  <sub>Built for job seekers worldwide</sub>
</p>
