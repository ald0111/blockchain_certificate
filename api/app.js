const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3000;
const whitelist = ["http://localhost:3001"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
// Parse JSON requests
app.use(bodyParser.json());

// Set up SQLite database
const db = new sqlite3.Database("bc.db");

// Create Users table
db.run(`CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  eth_address TEXT UNIQUE,
  password TEXT,
  name TEXT,
  role TEXT,
  organization_name TEXT
)`);

// Create Certificates table
db.run(`CREATE TABLE IF NOT EXISTS Certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  issuer_id INTEGER,
  date TEXT,
  event TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (issuer_id) REFERENCES Users(id)
)`);

// Define routes

// Get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Users WHERE id = ?", [id], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

// Create a new user
app.post("/users", (req, res) => {
  const { username, eth_address, password, name, role, organization_name } =
    req.body;
  db.run(
    "INSERT INTO Users (username, eth_address, password, name, role, organization_name) VALUES (?, ?, ?, ?, ?, ?)",
    [username, eth_address, password, name, role, organization_name],
    function (err) {
      if (err) {
        throw err;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Get all certificates
app.get("/certificates", (req, res) => {
  db.all("SELECT * FROM Certificates", (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Get certificate by ID
app.get("/certificates/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM CertificateView WHERE certificate_id = ?",
    [id],
    (err, row) => {
      if (err) {
        throw err;
      }
      res.json(row);
    }
  );
});

// Create a new certificate
app.post("/certificates", (req, res) => {
  const { user_id, issuer_id, date, event } = req.body;
  db.run(
    "INSERT INTO Certificates (user_id, issuer_id, date, event) VALUES (?, ?, ?, ?)",
    [user_id, issuer_id, date, event],
    function (err) {
      if (err) {
        throw err;
      }
      res.json({ id: this.lastID });
    }
  );
});

// ... (previous code remains unchanged)

// Validate Credentials and Return User ID
app.post("/validate-credentials", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT id FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        throw err;
      }
      if (row) {
        res.json({ userId: row.id });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
});

// Get Certificates by User ID
app.get("/certificates/:userId", (req, res) => {
  const { userId } = req.params;
  db.all(
    "SELECT * FROM Certificates WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

// ... (remaining code remains unchanged)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
