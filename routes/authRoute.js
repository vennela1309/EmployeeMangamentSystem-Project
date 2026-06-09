const express = require('express');
const router = express.Router();   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register route
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    const checkUser = `SELECT * FROM users WHERE email = ?`;   
    db.query(checkUser, [email], async (err, result) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)`;
        db.query(sql, [name, email, hashedPassword, role || 'employee'], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error inserting user', error: err.message });

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: 'User registered successfully ' });
            }
        });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
});

module.exports = router;   
