
const pool = require('./db');

/*const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});*/

exports.getAllServicios = (req, res) => {
  const query = `
  SELECT 
    servicio.id_servicio,
    servicio.tipo_servicio,
    servicio.descripcion_servicio,
    servicio.costo,
    servicio.id_personal,
    servicio.id_cliente,
    servicio.estado,
    cliente.Nombre AS nombre_cliente,
    personal.nombre AS nombre_personal,
    token_seguimiento.token
  FROM servicio
  LEFT JOIN cliente ON servicio.id_cliente = cliente.id_cliente
  LEFT JOIN personal ON servicio.id_personal = personal.id_personal
  LEFT JOIN (
    SELECT DISTINCT id_cliente, id_personal, token FROM token_seguimiento
  ) AS token_seguimiento ON servicio.id_cliente = token_seguimiento.id_cliente 
    AND servicio.id_personal = token_seguimiento.id_personal
  `;
  
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los servicios' });
    } else {
      res.json(results);
    }
  });
};
exports.getServicioById = (req, res) => {
  const { id_servicio } = req.params;
  pool.query('SELECT * FROM servicio WHERE id_servicio = ?', [id_servicio], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el servicio' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Servicio no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};


exports.createServicio = (req, res) => {
  const { tipo_servicio, descripcion_servicio, costo, id_personal, id_cliente, estado } = req.body;
  pool.query('INSERT INTO servicio (tipo_servicio, descripcion_servicio, costo, id_personal, id_cliente, estado) VALUES (?, ?, ?, ?, ?, ?)', 
    [tipo_servicio, descripcion_servicio, costo, id_personal, id_cliente, estado], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al crear el servicio', mysqlError: error.message });
      } else {
        res.status(201).json({ message: 'Servicio creado exitosamente', id: results.insertId });
      }
  });
};


exports.updateServicio = (req, res) => {
  const {  estado } = req.body;
  const { id_servicio } = req.params;
  pool.query('UPDATE servicio SET  estado = ? WHERE id_servicio = ?', 
    [ estado, id_servicio], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al actualizar el servicio', mysqlError: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Servicio no encontrado' });
      } else {
        res.json({ message: 'Servicio actualizado exitosamente' });
      }
  });
};


exports.deleteServicio = (req, res) => {
  const { id_servicio } = req.params;
  pool.query('DELETE FROM servicio WHERE id_servicio = ?', [id_servicio], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el servicio', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Servicio no encontrado' });
    } else {
      res.json({ message: 'Servicio eliminado exitosamente' });
    }
  });
};
exports.getServicioByToken = (req, res) => {
  const { token } = req.params;
  const query = `
    SELECT 
      servicio.id_servicio,
      servicio.tipo_servicio,
      servicio.descripcion_servicio,
      servicio.costo,
      servicio.id_personal,
      servicio.id_cliente,
      servicio.estado,
      cliente.Nombre AS nombre_cliente,
      personal.nombre AS nombre_personal
    FROM servicio
    LEFT JOIN cliente ON servicio.id_cliente = cliente.id_cliente
    LEFT JOIN personal ON servicio.id_personal = personal.id_personal
    LEFT JOIN token_seguimiento ON servicio.id_cliente = token_seguimiento.id_cliente 
        AND servicio.id_personal = token_seguimiento.id_personal
    WHERE token_seguimiento.token = ?
  `;
  
  pool.query(query, [token], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el servicio por token' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Servicio no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};