const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contacts_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes

// Get all contacts
app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching contacts');
        }
        res.send(results);
    });
});

// Get a contact by ID
app.get('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching contact');
        }
        if (results.length === 0) {
            return res.status(404).send('Contact not found');
        }
        res.send(results[0]);
    });
});

// Create a new contact
app.post('/contacts', upload.single('profile_image'), (req, res) => {
    const { name, address, email, phone_number } = req.body;  // Destructure phone_number here
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate that phone_number is not null or undefined
    if (!phone_number) {
        return res.status(400).send('Phone number is required');
    }

    const sql = 'INSERT INTO contacts (name, address, email, phone_number, profile_image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, address, email, phone_number, profileImage], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating contact');
        }
        res.send({ id: results.insertId, name, address, email, phone_number, profileImage });
    });
});

// Update a contact
app.put('/contacts/:id', upload.single('profile_image'), (req, res) => {
    const { id } = req.params;
    const { name, address, email, phone_number } = req.body;  // Destructure phone_number here
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate that phone_number is not null or undefined
    if (!phone_number) {
        return res.status(400).send('Phone number is required');
    }

    let sql;
    let params;

    if (profileImage) {
        sql = 'UPDATE contacts SET name = ?, address = ?, email = ?, phone_number = ?, profile_image = ? WHERE id = ?';
        params = [name, address, email, phone_number, profileImage, id];
    } else {
        sql = 'UPDATE contacts SET name = ?, address = ?, email = ?, phone_number = ? WHERE id = ?';
        params = [name, address, email, phone_number, id];
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating contact');
        }
        res.send('Contact updated successfully');
    });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting contact');
        }
        res.send('Contact deleted successfully');
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
