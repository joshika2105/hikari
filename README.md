# Hikari

### AI-powered study planner and personal learning environment

Hikari is a modern study platform designed to bring studying, planning, notes, AI assistance, and productivity together in one clean and personalized environment.

The interface adapts to the user's time of day, weather, and study situation, creating an environment that changes from soft morning colors to bright daytime, warm sunset tones, and a dark night atmosphere.

The goal is to create a study application that does not just tell the user what they have to do, but helps them decide what to study, when to study it, and how to learn it.

---

# Concept

Hikari combines:

* Study planning
* Focus sessions
* AI-powered learning
* Personal notes
* Document processing
* Calendar and deadlines
* Smart reminders
* Study statistics
* Exam preparation
* Dynamic visual environment
* Accessibility

The application is organized around four main areas:

**Home · Study · Plan · Notes**

AI is integrated throughout the application instead of being treated as a separate feature.

---

# Features

## Home

The home page provides a personalized overview of the user's day.

* Dynamic time-based interface
* Weather-based environment
* Morning, daytime, sunset, and nighttime themes
* Current weather information
* Today's tasks
* Today's planned study sessions
* Upcoming exams
* Quick-start study sessions
* Study recommendations
* Smart notifications
* "I only have 30 minutes" quick action
* Daily overview

---

# Study

A dedicated area for learning and focusing.

## Study Timer

* Pomodoro timer
* Custom study durations
* Short and long breaks
* Subject-specific sessions
* Automatic session tracking
* Focus mode
* Session history

## Smart Study

The application can recommend what the user should study based on:

* Upcoming exams
* Deadlines
* Available study time
* Previous study sessions
* Weak topics
* Study plans

Example:

> You have 30 minutes available. Mathematics is currently your highest priority, so a 25-minute revision session is recommended.

## Quick Study

The user can tell Hikari:

> I only have 30 minutes.

The system creates a suitable short study session based on current priorities.

## Catch-Up Mode

If planned study sessions are missed, Hikari can reorganize the remaining schedule instead of simply marking everything as overdue.

---

# AI Learning Assistant

AI is integrated into the entire learning experience.

Users can interact with their learning material and ask the AI to:

* Explain concepts
* Summarize content
* Simplify difficult topics
* Create study guides
* Generate questions
* Generate flashcards
* Create practice tests
* Prepare oral-exam questions
* Identify important information
* Identify missing information from notes
* Recommend what to study
* Create personalized study plans

## AI Tutor

The AI can act as a personal tutor instead of simply providing answers.

It can:

1. Explain a topic
2. Ask the user questions
3. Evaluate the answer
4. Identify weaknesses
5. Provide hints
6. Recommend further practice

---

# AI Document Processing

Users can upload learning material such as:

* PDF files
* Images
* Screenshots
* Documents
* Scanned worksheets
* Photos of handwritten notes

The backend processes the material and converts it into structured learning content.

Possible workflow:

```text
Upload
   |
   v
Document extraction
   |
   v
OCR if necessary
   |
   v
Content processing
   |
   v
AI analysis
   |
   v
Structured learning data
   |
   +----> Notes
   +----> Flashcards
   +----> Questions
   +----> Practice tests
   +----> Study guides
```

---

# Notes

Hikari provides a personal learning workspace.

## AI-Generated Notes

Users can generate:

* Short summaries
* Detailed summaries
* Structured notes
* Key-point lists
* Study guides
* Glossaries
* Important formulas
* Definitions

## Personal Study Editor

Users can edit and extend AI-generated notes themselves.

The editor should support:

* Headings
* Bold
* Italic
* Underline
* Lists
* Checkboxes
* Tables
* Images
* Links
* Highlighting
* Personal annotations

AI-generated content and personal notes can exist side by side.

## Export

Notes can be exported as:

* PDF
* DOCX
* TXT
* Markdown

---

# Subjects

Users can create and manage their own subjects.

Examples:

* Mathematics
* Java
* Database Systems
* English
* German
* Business
* Computer Science

Each subject can contain:

* Notes
* Documents
* Flashcards
* Practice tests
* Exams
* Tasks
* Study sessions
* Progress
* AI-generated material

---

# Flashcards

AI can automatically generate flashcards from uploaded content or notes.

Users can mark cards as:

* Don't know
* Almost
* Know

The application can use this information to determine which cards should be reviewed again.

A future goal is to implement spaced repetition.

---

# AI Practice Tests

Users can generate practice tests from their learning material.

Possible question types:

* Multiple choice
* True or false
* Short answer
* Open questions
* Calculation questions
* Oral questions

After completing a test, Hikari provides:

* Score
* Correct answers
* Mistakes
* Weak topics
* Recommended revision

---

# AI Oral Exam

Hikari can simulate an oral examination.

The AI asks questions based on the user's learning material.

The user answers using text or voice.

The system can evaluate:

* Correctness
* Missing information
* Important terminology
* Understanding
* Possible follow-up questions

---

# Plan

The planning section manages everything related to school and studying.

## Smart Calendar

The calendar can contain:

* Study sessions
* Exams
* Tests
* Presentations
* Assignments
* Deadlines
* Personal tasks
* Reminders

Events should remain accessible without relying only on color.

## Exams

Users can enter:

* Subject
* Exam date
* Topics
* Difficulty
* Available preparation time
* Desired start date

For example:

```text
Mathematics Exam
25 September

Start studying:
7 days before
```

Hikari can then automatically create a study plan.

Example:

```text
18 Sep -> Functions
19 Sep -> Derivatives
20 Sep -> Integrals
21 Sep -> Exercises
22 Sep -> Revision
23 Sep -> Practice test
24 Sep -> Final revision
25 Sep -> EXAM
```

## Presentations

Presentations can also be planned.

The system can create preparation tasks such as:

* Research
* Create slides
* Write speaking notes
* Practice
* Final preparation

AI can additionally generate possible questions a teacher could ask.

---

# Smart Reminders

Hikari can remind users about:

* Upcoming exams
* Planned study sessions
* Assignments
* Presentations
* Missed sessions
* Study-plan start dates

Instead of simple reminders, notifications can contain context.

Example:

> Your Mathematics exam is in 7 days. You planned to start studying today. You have 4 topics remaining.

Potential notification methods:

* Browser notifications
* Email
* Phone notifications
* SMS

---

# Study Statistics

Hikari tracks learning activity and provides useful statistics.

Possible statistics:

* Total study time
* Study time per subject
* Daily study time
* Weekly study time
* Monthly study time
* Average session length
* Completed tasks
* Completed study sessions
* Study streaks
* Practice-test results
* Flashcard performance

## Progress

The application can identify:

* Strong subjects
* Weak subjects
* Frequently missed topics
* Most productive study times
* Study habits

Example:

> You perform best when studying Mathematics between 16:00 and 18:00.

---

# Dynamic Environment

One of Hikari's main visual features is a dynamic environment that changes with the user's surroundings.

## Time-Based Themes

### Morning

Soft pink, white, and lavender tones.

### Day

Bright and clean colors.

### Sunset

Warm orange, pink, and purple tones.

### Night

Dark blue and purple environment with stars.

## Weather-Based Themes

Possible environments include:

* Sunny
* Rain
* Storm
* Snow
* Cloudy
* Partly cloudy

Animations should remain subtle so they do not distract from studying.

---

# Integrations

## Moodle

Potential Moodle integration can import information such as:

* Assignments
* Deadlines
* Courses
* Announcements

Moodle assignments can appear inside the Hikari planner and calendar.

## Spotify

Potential Spotify integration can provide:

* Study playlists
* Focus music
* Timer-based playback
* Study-session music

## Calendar

Potential calendar integrations can synchronize:

* Exams
* Study sessions
* Presentations
* School events
* Personal events

---

# Authentication and Users

Hikari is designed as a multi-user application.

Users will have their own:

* Account
* Subjects
* Notes
* Documents
* Tasks
* Exams
* Study sessions
* Statistics
* Settings

A simple development login can initially be used during development, but authentication will ultimately be handled securely by the backend.

---

# Accessibility

Accessibility is an important part of the project.

The application should support:

* Keyboard navigation
* Screen readers
* Semantic HTML
* Accessible forms
* Visible focus states
* High-contrast mode
* Adjustable text size
* Reduced-motion mode
* Accessible buttons and controls
* Accessible calendar interactions
* Information that does not rely only on color
* Clear error messages
* Proper heading hierarchy

Animations should respect the user's `prefers-reduced-motion` preference.

---

# Technology Stack

## Frontend

* Angular
* TypeScript
* SCSS
* GSAP
* HTML
* CSS

## Backend

* Python
* FastAPI
* Pydantic

## Database

* PostgreSQL

## AI and Document Processing

* LLM API
* PDF processing
* OCR
* Document extraction
* Structured JSON generation

## Development

* Git
* GitHub
* Visual Studio Code
* npm

---

# Architecture

The application follows a frontend/backend architecture.

```text
                    +------------------+
                    |     Angular      |
                    |    Frontend      |
                    +--------+---------+
                             |
                       REST API / JSON
                             |
                             v
                    +------------------+
                    |     FastAPI      |
                    |     Backend      |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
        PostgreSQL          AI       Document Processing
```

The frontend should never directly access the database.

All application data should go through the backend API.

---

# Planned Project Structure

```text
hikari/
|
+-- frontend/
|   +-- Angular application
|
+-- backend/
|   +-- app/
|       +-- api/
|       +-- models/
|       +-- schemas/
|       +-- services/
|       +-- ai/
|       +-- documents/
|       +-- main.py
|
+-- docs/
|   +-- architecture/
|   +-- database/
|   +-- project-documentation/
|
+-- .gitignore
+-- README.md
```

---

# Development Roadmap

## Phase 1 — Foundation

* [ ] Create GitHub repository
* [ ] Set up Angular frontend
* [ ] Set up Python/FastAPI backend
* [ ] Connect frontend and backend
* [ ] Set up database
* [ ] Create basic application architecture
* [ ] Create authentication system

## Phase 2 — Core Application

* [ ] Home dashboard
* [ ] Subjects
* [ ] Tasks
* [ ] Exams
* [ ] Calendar
* [ ] Study timer
* [ ] Study sessions
* [ ] Basic statistics

## Phase 3 — Notes and Documents

* [ ] File upload
* [ ] PDF processing
* [ ] OCR
* [ ] Notes system
* [ ] Personal study editor
* [ ] PDF export
* [ ] DOCX export

## Phase 4 — AI

* [ ] AI assistant
* [ ] AI summaries
* [ ] AI-generated notes
* [ ] AI explanations
* [ ] Flashcard generation
* [ ] Practice-test generation
* [ ] AI study recommendations
* [ ] AI oral exam
* [ ] AI study-plan generation

## Phase 5 — Smart Planning

* [ ] Automatic study plans
* [ ] Smart reminders
* [ ] Catch-up mode
* [ ] "I only have 30 minutes" mode
* [ ] Exam preparation planning
* [ ] Presentation planning

## Phase 6 — Integrations

* [ ] Moodle integration
* [ ] Spotify integration
* [ ] Calendar synchronization
* [ ] Browser notifications
* [ ] Email notifications
* [ ] SMS notifications

## Phase 7 — Visual Experience

* [ ] Dynamic time-based themes
* [ ] Weather integration
* [ ] Sunrise and sunset transitions
* [ ] Rain animations
* [ ] Snow animations
* [ ] Stars and night environment
* [ ] GSAP page transitions
* [ ] Reduced-motion support

## Phase 8 — Finalization

* [ ] Accessibility audit
* [ ] Security review
* [ ] Performance optimization
* [ ] Responsive design
* [ ] Testing
* [ ] Documentation
* [ ] Deployment

---

# Project Goal

The goal of Hikari is to create a personal learning environment that combines planning, productivity, AI, and learning material into one connected application.

Instead of using separate applications for:

* Calendar
* Notes
* Flashcards
* AI
* Study timer
* Tasks
* Exam planning
* Documents
* Statistics

Hikari brings them together into one system.

> Plan your time. Understand your material. Learn your way.

---

# Name

**Hikari (光)**

Hikari is a Japanese word meaning **light**.

The name represents the visual concept of the application:

**Morning light → Daylight → Sunset → Moonlight**

The application changes with the user's day while remaining a calm and focused environment for learning.

---

# Project Status

**In Development**

This project is being developed as an HTL software project and will evolve throughout the development process.
