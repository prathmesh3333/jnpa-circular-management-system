const db = require('../db');

exports.getAllCirculars = (req, res) => {
  db.query('SELECT * FROM circulars', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.addCircular = (req, res) => {
  const { department, title, description, date, file_path } = req.body;
  db.query(
    'INSERT INTO circulars (department, title, description, date, file_path) VALUES (?, ?, ?, ?, ?)',
    [department, title, description, date, file_path],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Circular added', id: results.insertId });
    }
  );
};

exports.deleteCircular = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM circulars WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Circular deleted' });
  });
};
