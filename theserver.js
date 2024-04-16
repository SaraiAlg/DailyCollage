const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies and cookies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MySQL database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "new_schema"
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Registration route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [username, email, password], (error, results) => {
        if (error) {
            console.error('Error in registration:', error);
            return res.status(500).send('Error registering new user.');
        }
        res.cookie('sessionId', '123456', { httpOnly: true }); // Example cookie
        res.send("User registered successfully!");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
