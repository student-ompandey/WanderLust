# WanderLust

WanderLust is a robust web application designed for modern travelers to discover, share, and review unique travel destinations. Whether you're looking to document your journeys or find inspiration for your next trip, WanderLust provides an interactive platform to connect adventurers from around the world.

## 🌍 Features

- **Discover Destinations:** Browse a growing collection of travel spots with photos, descriptions, and user reviews.
- **User Authentication:** Secure sign-up and login system for an individualized experience.
- **Post & Review:** Share new destinations, upload images, and leave helpful reviews for the community.
- **Interactive Maps:** View destination locations on integrated maps.
- **Favorite & Save:** Bookmark favorite places for easy access.
- **Responsive Design:** Seamless experience across all screen sizes.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or above)
- [MongoDB](https://www.mongodb.com/) (local installation or Atlas cluster)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/student-ompandey/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```

4. **Start the app**
   ```bash
   npm start
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML5, CSS3, JavaScript (Vanilla or React)
- **Database:** MongoDB & Mongoose
- **Authentication:** Passport.js (Local Strategy)
- **Maps Integration:** Mapbox or Google Maps API

## 📂 Project Structure

```
WanderLust/
├── models/
├── routes/
├── public/
│   ├── css/
│   └── js/
├── views/
├── .env (not committed)
├── app.js / server.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for review.

1. Fork the repo and clone your fork.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a pull request.

## 📃 License

[MIT](LICENSE)

## 📢 Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Mapbox](https://www.mapbox.com/) or [Google Maps](https://developers.google.com/maps)
- Inspiration: YelpCamp (from Colt Steele’s Web Bootcamp)

---

Happy traveling! 🌏✨
