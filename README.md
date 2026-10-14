# Accenture Prep Arena

> **Assessment Readiness & MCQ Practice Platform**  
> An all-in-one, responsive, interactive web application engineered to prepare candidates for Accenture technical recruitment assessments and national qualification exams. Built with React 19, Vite, and the official Google GenAI SDK.

---

## 1. Project Overview

**Accenture Prep Arena** provides students and job seekers with a realistic, high-fidelity assessment environment focused strictly on:
- **Comprehensive Assessment Domains**: Complete coverage across 34+ technical subjects including Pseudocodes & Logic Tracing, MS Excel, MS Office (Common Applications), Network Security, Cloud Computing, and Core CS Fundamentals (OS, Networks, DBMS, SQL, OOP, etc.).
- **100% Dynamic Gemini AI Generation**: Practice questions and full 40-question mock exams are generated on-demand using Google Gemini API (`@google/genai`) with automatic fallback to a comprehensive verified bank.
- **Full-Length 40-Minute Mock Assessment**: Exactly 40 questions in 40 minutes across 4 balanced domain batches with timestamp drift-immune timer, 40-question palette, and automated submission.
- **Three Flexible Practice Modes**:
  - **Practice Mode**: Immediate feedback, deep technical explanations, and option-by-option breakdowns.
  - **Test Mode**: Real exam simulation with questions answered without feedback until test completion.
  - **Revision Mode**: Dedicated revision bank targeting previously incorrect questions.
- **Persistent Analytics Dashboard**: Track total questions answered, accuracy rate, syllabus topics mastered, weak area diagnostics, and detailed test attempt history.

---

## 2. Supported Syllabus Topics

- **Pseudocodes & Logic Tracing**: Bitwise operators (`^`, `&`, `|`, `~`, `<<`, `>>`), loops, conditional logic, recursion, and variable tracing.
- **MS Excel**: Lookup functions (`VLOOKUP`, `HLOOKUP`, `XLOOKUP`), conditional logic (`SUMIF`, `COUNTIF`, `IF`), cell referencing (`$A$1`), pivot tables, and keyboard shortcuts.
- **MS Office & Common Applications**: MS Word (Mail Merge, formatting), MS PowerPoint (Slide Master, transitions), MS Outlook, and collaborative cloud tools.
- **Network Security**: Cryptography, symmetric/asymmetric encryption, firewalls, SSL/TLS, VPN, DDoS mitigation, and common attack vectors.
- **Cloud Computing**: Virtualization, Cloud Service Models (IaaS, PaaS, SaaS), Deployment Models, AWS/Azure core primitives, VPC, IAM, and scalability.
- **Core CS Fundamentals**: Operating Systems, Computer Networks, Database Management Systems (DBMS), SQL, Object-Oriented Programming (OOP), Data Structures & Algorithms, Computer Architecture, Software Engineering & SDLC, and modern programming languages (C, C++, Java, Python, JavaScript).

---

## 3. Tech Stack

- **Core & Build**: React 19, JavaScript (ES6+), Vite 8
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **AI Question Generation**: `@google/genai` (Official Google GenAI SDK)
- **Effects**: Canvas Confetti
- **Testing**: Vitest for unit tests

---

## 4. Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Setup
```bash
# Clone or navigate into the repository
cd Nissi

# Install dependencies
npm install

# Run development server
npm run dev
```

### Configure Gemini API Key (Optional)
To generate dynamic questions using the Google Gemini API, add your key to `.env`:
```env
VITE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
```
*(Alternatively, configure your key dynamically in the in-app Settings modal without editing `.env`)*

---

## 5. Development & Test Commands

- **Start Local Server**: `npm run dev`
- **Run Unit Tests**: `npm run test`
- **Production Build**: `npm run build`
- **Preview Production Build**: `npm run preview`

---

## 6. Disclaimer

*Accenture Prep Arena is an independent preparation and educational platform. It is not affiliated with, authorized by, sponsored by, or endorsed by Accenture.*
