-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  eth_address TEXT UNIQUE,
  password TEXT,
  name TEXT,
  role TEXT,
  organization_name TEXT
)

-- Create Certificates Table
CREATE TABLE IF NOT EXISTS Certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  issuer_id INTEGER,
  date TEXT,
  event TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (issuer_id) REFERENCES Users(id)
)