
const pool = require('./db');

/*const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});

*/
exports.getAllTokens = (req, res) => {
  pool.query('SELECT * FROM token_seguimiento', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los tokens de seguimiento', mysqlError: error.message });
    } else {
      res.json(results);
    }
  });
};


exports.getTokenById = (req, res) => {
  const { id_token } = req.params;
  pool.query('SELECT * FROM token_seguimiento WHERE id_token = ?', [id_token], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el token de seguimiento', mysqlError: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Token de seguimiento no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};


exports.createToken = (req, res) => {
  const { id_cliente, id_personal, token } = req.body;
  pool.query('INSERT INTO token_seguimiento (id_cliente, id_personal, token) VALUES (?, ?, ?)', [id_cliente, id_personal, token], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al crear el token de seguimiento', mysqlError: error.message });
    } else {
      res.status(201).json({ message: 'Token de seguimiento creado exitosamente', id: results.insertId });
    }
  });
};


exports.updateToken = (req, res) => {
  const { id_cliente, id_personal, token } = req.body;
  const { id_token } = req.params;
  pool.query('UPDATE token_seguimiento SET id_cliente = ?, id_personal = ?, token = ? WHERE id_token = ?', [id_cliente, id_personal, token, id_token], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al actualizar el token de seguimiento', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Token de seguimiento no encontrado' });
    } else {
      res.json({ message: 'Token de seguimiento actualizado exitosamente' });
    }
  });
};


exports.deleteToken = (req, res) => {
  const { id_token } = req.params;
  pool.query('DELETE FROM token_seguimiento WHERE id_token = ?', [id_token], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el token de seguimiento', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Token de seguimiento no encontrado' });
    } else {
      res.json({ message: 'Token de seguimiento eliminado exitosamente' });
    }
  });
};
