const mysql = require('mysql');
const pool = require('./db');

/*const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});*/

exports.getAllConsultas = (req, res) => {
  pool.query('SELECT * FROM consulta', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener las consultas' });
    } else {
      res.json(results);
    }
  });
};


exports.getConsultaById = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM consulta WHERE id_consulta = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener la consulta' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Consulta no encontrada' });
    } else {
      res.json(results[0]);
    }
  });
};


exports.createConsulta = (req, res) => {
  const { fecha_consulta, tipo_consulta } = req.body;
  pool.query('INSERT INTO consulta (fecha_consulta, tipo_consulta) VALUES (?, ?)', [fecha_consulta, tipo_consulta], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al crear la consulta', mysqlError: error.message });
    } else {
      res.status(201).json({ message: 'Consulta creada exitosamente', id: results.insertId });
    }
  });
};

exports.updateConsulta = (req, res) => {
  const { fecha_consulta, tipo_consulta } = req.body;
  const { id_consulta } = req.params;

  console.log(`Actualizando consulta con id_consulta: ${id_consulta}`);
  console.log(`Nuevos valores - fecha_consulta: ${fecha_consulta}, tipo_consulta: ${tipo_consulta}`);

  pool.query(
    'UPDATE consulta SET fecha_consulta = ?, tipo_consulta = ? WHERE id_consulta = ?',
    [fecha_consulta, tipo_consulta, id_consulta],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar la consulta:', error);
        res.status(500).json({ error: 'Error al actualizar la consulta', mysqlError: error.message });
      } else {
        console.log('Resultado de la actualización:', results);
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Consulta no encontrada' });
        } else {
          res.json({ message: 'Consulta actualizada exitosamente' });
        }
      }
    }
  );
};


exports.deleteConsulta = (req, res) => {
  const { id_consulta } = req.params;

  console.log(`Eliminando consulta con id_consulta: ${id_consulta}`);

  pool.query('DELETE FROM consulta WHERE id_consulta = ?', [id_consulta], (error, results) => {
    if (error) {
      console.error('Error al eliminar la consulta:', error);
      res.status(500).json({ error: 'Error al eliminar la consulta', mysqlError: error.message });
    } else {
      console.log('Resultado de la eliminación:', results);
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Consulta no encontrada' });
      } else {
        res.json({ message: 'Consulta eliminada exitosamente' });
      }
    }
  });
};
