-- Create Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    eth_address VARCHAR(42) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    role VARCHAR(50),
    organization_name VARCHAR(255)
);

-- Create Certificates Table
CREATE TABLE Certificates (
    id SERIAL PRIMARY KEY,
    certificate_id VARCHAR(50) UNIQUE,
    user_id INT,
    issuer_id INT,
    date DATE,
    event VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (issuer_id) REFERENCES Users(id)
);

