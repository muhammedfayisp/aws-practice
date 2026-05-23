const db = require("../config/db");

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    res.json(result);
  });
};

const createUsers = (req, res) => {
  const { name, email } = req.body;

  const query =
    "INSERT INTO users (name, email) VALUES (?, ?)";

  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Created successfully",
      userid: result.insertId,
    });
  });
};

module.exports = {
  getUsers,
  createUsers,
};