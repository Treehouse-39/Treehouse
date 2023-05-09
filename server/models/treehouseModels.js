const { Pool } = require('pg');
const dotenv = require('dotenv').config()
console.log('pg file ran')
const connectionString = process.env.PG_URI;
const pool = new Pool({
  connectionString,
});

pool.connect();

// Define the schema creation query
const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS treehouse_schema`;

// Run the schema creation query. (none is for a query that expects no response)
async function createSchema() {
  await pool.query(createSchemaQuery)
  .then(() => console.log('Schema created successfully'))
  .catch((err) => console.error('Error creating schema:', err));
}

//TO DO: make table for users
const makeTreeTable = `CREATE TABLE IF NOT EXISTS tree (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(24) NOT NULL,
    password VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id) 
)`;

async function createTreeTable() {
    await pool.query(makeTreeTable)
    .then(() => console.log('Table created successfully'))
    .catch((err) => console.error('Error creating tree table:', err));
}

//TO DO: make table for users
const makePeopleTable = `CREATE TABLE IF NOT EXISTS people (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    family_tree INTEGER REFERENCES tree(id),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number CHAR(20),
    email VARCHAR(255),
    birthday DATE NOT NULL,
    death_date DATE,
    street_address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    spouse_id INTEGER REFERENCES people(id),
    mom_id INTEGER REFERENCES people(id),
    dad_id INTEGER REFERENCES people(id),
    PRIMARY KEY (id)
 )`;

async function createPeopleTable() {
  await pool.query(makePeopleTable)
  .then(() => console.log('Table created successfully'))
  .catch((err) => console.error('Error creating people table:', err));
}

// createSchema();
// createPeopleTable();
// createTreeTable();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};




// CREATE TABLE mytable (
//   id SERIAL PRIMARY KEY,
//   parent_id INTEGER REFERENCES mytable(id),
//   -- other columns
// );

// INSERT INTO mytable (parent_id, ...) VALUES (1, ...);

// SELECT * FROM mytable WHERE parent_id = 1;


// CREATE TABLE parent (
//   id SERIAL PRIMARY KEY,
//   -- other columns
// );

// CREATE TABLE child (
//   id SERIAL PRIMARY KEY,
//   -- other columns
// );

// CREATE TABLE parent_child (
//   parent_id INTEGER REFERENCES parent(id),
//   child_id INTEGER REFERENCES child(id),
//   spouse_id INTEGER REFERENCES person(person_id)
//   PRIMARY KEY (parent_id, child_id, spouse_id)
// );




// CREATE TABLE person (
//   id SERIAL PRIMARY KEY,
//   first_name TEXT NOT NULL,
//   last_name TEXT NOT NULL,
//   birth_date DATE,
//   -- other columns for additional information about the person
// );

// CREATE TABLE relationship (
//   id INT GEREATnaknlakjdnfafdsa
//   parent_1_id INTEGER NOT NULL REFERENCES person(id), - referencing their parents
//   parent_2_id INTEGER NOT NULL REFERENCES person(id), - referencing their parents
//   child_id int[]
//   FOREIGN KEY (EACH ELEMENT OF CHILD_ID) REFERENCES WHATEVERTABEL
//   child_id INTEGER NOT NULL REFERENCES person(id), - their kids
//   PRIMARY KEY (parent_id, child_id)
// );