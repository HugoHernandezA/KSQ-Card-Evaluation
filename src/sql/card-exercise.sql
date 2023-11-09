CREATE DATABASE "cards-db";
-- \c "cards-db"; To connect to DB inmediatly, this might not be needed in some cases.

CREATE TABLE Card (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    rating INTEGER
);

CREATE TABLE Userx (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Rating (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES Card(id),
    user_id INTEGER UNIQUE REFERENCES Userx(id),
    comment TEXT,
    value INTEGER
);