# WanderLust 🌍

WanderLust is a server-side rendered Node.js web application built with Express and MongoDB. Inspired by platforms like Airbnb, it allows users to explore, create, and review travel accommodations and listings.

## Features
- **User Authentication**: Secure signup and login functionality using Passport.js.
- **Listings Management**: Full CRUD (Create, Read, Update, Delete) operations for travel listings.
- **Review System**: Users can leave ratings and text reviews on accommodations.
- **Form Validation**: Strict server-side input validation integrated via Joi.
- **Session Management**: Persistent user sessions and interactive flash messages for a better UI experience.

## Tech Stack
- **Backend Framework**: [Node.js](https://nodejs.org/en) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Templating Engine**: [EJS](https://ejs.co/) (with `ejs-mate` for layouts)
- **Authentication**: [Passport.js](https://www.passportjs.org/) (Local Strategy)
- **Data Validation**: [Joi](https://joi.dev/)

## Prerequisites
Ensure the following are installed on your local machine before running the app:
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd WanderLust
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start MongoDB
Make sure your local MongoDB server is running on the default port (`27017`). The app will attempt to connect to:
`mongodb://127.0.0.1:27017/wanderlust`

### 4. Run the application
```bash
node app.js
```
*Alternatively, if you use nodemon:*
```bash
nodemon app.js
```

### 5. Access in the browser
Open your web browser and navigate to:
[http://localhost:8000](http://localhost:8000)

## Project Structure
```text
WanderLust/
├── models/         # Mongoose schemas (Listing, Review, User)
├── public/         # Static assets (CSS, JS, Images)
├── routes/         # Express Router modules (listings, reviews, users)
├── utils/          # Utility classes (Custom Express Error handling)
├── views/          # EJS templates and layouts
├── app.js          # Application entry point
├── Schema.js       # Joi schemas for server-side validation
└── package.json    # Project dependencies and scripts
```
