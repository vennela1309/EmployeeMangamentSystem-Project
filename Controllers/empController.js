const db = require("../config/database");

// Add new employee
exports.addEmployee = (req, res) => {
  const { name, email, position, salary } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const sql = "INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, position, salary], (err, result) => {
    if (err) {
      console.error("Error inserting employee:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }

      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Employee added successfully", id: result.insertId });
  });
};
