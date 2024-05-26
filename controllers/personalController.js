const mysql = require('mysql');
const pool = require('./db');

/*const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});
*/

exports.getAllPersonal = (req, res) => {
  pool.query('SELECT * FROM personal', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el personal' });
    } else {
      res.json(results);
    }
  });
};


exports.getPersonalById = (req, res) => {
  const { id_personal } = req.params;
  pool.query('SELECT * FROM personal WHERE id_personal = ?', [id_personal], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el personal' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Personal no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};


exports.createPersonal = (req, res) => {
  const { nombre, celular, cargo } = req.body;
  pool.query('INSERT INTO personal (nombre, celular, cargo) VALUES (?, ?, ?)', 
    [nombre, celular, cargo], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al crear el personal', mysqlError: error.message });
      } else {
        res.status(201).json({ message: 'Personal creado exitosamente', id: results.insertId });
      }
  });
};


exports.updatePersonal = (req, res) => {
  const { nombre, celular, cargo } = req.body;
  const { id_personal } = req.params;
  pool.query('UPDATE personal SET nombre = ?, celular = ?, cargo = ? WHERE id_personal = ?', 
    [nombre, celular, cargo, id_personal], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al actualizar el personal', mysqlError: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Personal no encontrado' });
      } else {
        res.json({ message: 'Personal actualizado exitosamente' });
      }
  });
};


exports.deletePersonal = (req, res) => {
  const { id_personal } = req.params;
  pool.query('DELETE FROM personal WHERE id_personal = ?', [id_personal], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el personal', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Personal no encontrado' });
    } else {
      res.json({ message: 'Personal eliminado exitosamente' });
    }
  });
};
