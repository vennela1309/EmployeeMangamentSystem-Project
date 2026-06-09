const express = require('express');
const router = express.Router();
const db = require('../config/database');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/add', authMiddleware, (req, res) => {
    const { name, position, salary } = req.body;

    if (!name || !position || !salary) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO employees (name, position, salary) VALUES (?,?,?)';
    db.query(sql, [name, position, salary], (err, result) => {
        if (err) return res.status(500).json({ message: 'DB Error', error: err });

        res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
    });
});


router.get('/', authMiddleware, (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error', error: err });

        res.json(results);
    });
});


router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error', error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(results[0]);
    });
});


router.put('/update/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;

    const sql = 'UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?';
    db.query(sql, [name, position, salary, id], (err, result) => {
        if (err) return res.status(500).json({ message: 'DB Error', error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee updated successfully' });
    });
});


router.delete('/delete/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'DB Error', error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    });
});

module.exports = router;
