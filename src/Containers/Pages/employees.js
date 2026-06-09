import React, { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: ""
  });

  const token = localStorage.getItem("token");

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/employees", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add new employee
const handleAddEmployee = async (e) => {
  e.preventDefault();

  if (!newEmployee.name || !newEmployee.email) {
    alert("Name and Email are required");
    return;
  }

  try {
    await axios.post(
      "http://localhost:3000/employees/add",
      {
        ...newEmployee,
        salary: newEmployee.salary ? parseFloat(newEmployee.salary) : null
      },
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    alert("Employee added!");
    setNewEmployee({ name: "", email: "", position: "", salary: "" });
    fetchEmployees();
  } catch (err) {
    alert(err.response?.data?.message || "Error adding employee");
  }
};

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:3000/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Employee deleted!");
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting employee");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employees</h2>

      {/* Employee Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Form */}
      <h3 style={{ marginTop: "30px" }}>Add Employee</h3>
      <form onSubmit={handleAddEmployee}>
        <input
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          required
        /><br />
        <input
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          required
        /><br />
        <input
          name="position"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        /><br />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
        /><br />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default Employees;
