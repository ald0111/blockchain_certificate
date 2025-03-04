const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3001;
// const whitelist = ["http://localhost:3001"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
// Parse JSON requests
app.use(bodyParser.json());

// Set up SQLite database
const db = new sqlite3.Database("bc.db");

// Create Users table
db.run(`CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  eth_address TEXT,
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
      res.json({ id: this.lastID, role: role });
    }
  );
});

// Get all certificates
app.get("/certificates", (req, res) => {
  const { user_id } = req.query;
  console.log(req.query);
  db.all(
    "SELECT id FROM Certificates WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

// Get certificate by ID
app.get("/certificates/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM CertificateView WHERE certificate_id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
      console.log(row);
    }
  );
});

// Create a new certificate
app.post("/certificates", (req, res) => {
  const { user_id, issuer_id, date, event } = req.body;
  console.log(req.body);

  db.run(
    "INSERT INTO Certificates (user_id, issuer_id, date, event) VALUES (?, ?, ?, ?)",
    [user_id, issuer_id, date, event],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const insertedId = this.lastID;

      // Fetch the newly inserted certificate
      db.get(
        "SELECT * FROM CertificateView WHERE certificate_id = ?",
        [insertedId],
        (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          console.log(row);
          res.json(row);
        }
      );
    }
  );
});

// ... (previous code remains unchanged)

// Validate Credentials and Return User ID
app.post("/validate-credentials", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT id,role FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        throw err;
      }
      if (row) {
        res.json({ userId: row.id, role: row.role });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
});

// Get Certificates by User ID
app.get("/admin/certs", (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM CertificateView;", [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// ... (remaining code remains unchanged)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
