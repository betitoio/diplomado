const mysql = require('mysql');
const pool = require('./db');
/*
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});
*/

exports.getAllUsuarios = (req, res) => {
  pool.query('SELECT * FROM usuario', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios', mysqlError: error.message });
    } else {
      res.json(results);
    }
  });
};


exports.getUsuarioById = (req, res) => {
  const { id_usuario } = req.params;
  pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el usuario', mysqlError: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};


exports.createUsuario = (req, res) => {
  const { Usuario, Contraseña, id_personal } = req.body;
  pool.query('INSERT INTO usuario (Usuario, Contraseña, id_personal) VALUES (?, ?, ?)', [Usuario, Contraseña, id_personal], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al crear el usuario', mysqlError: error.message });
    } else {
      res.status(201).json({ message: 'Usuario creado exitosamente', id: results.insertId });
    }
  });
};


exports.updateUsuario = (req, res) => {
  const { Usuario, Contraseña, id_personal } = req.body;
  const { id_usuario } = req.params;
  pool.query('UPDATE usuario SET Usuario = ?, Contraseña = ?, id_personal = ? WHERE id_usuario = ?', [Usuario, Contraseña, id_personal, id_usuario], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario actualizado exitosamente' });
    }
  });
};


exports.deleteUsuario = (req, res) => {
  const { id_usuario } = req.params;
  pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario eliminado exitosamente' });
    }
  });
};

exports.loginUsuario = (req, res) => {
  const { Usuario, Contraseña } = req.body;
  const query = `
    SELECT usuario.*, personal.nombre AS nombre_personal
    FROM usuario
    JOIN personal ON usuario.id_personal = personal.id_personal
    WHERE usuario.Usuario = ? AND usuario.Contraseña = ?
  `;
  
  pool.query(query, [Usuario, Contraseña], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Error al verificar el usuario', mysqlError: error.message });
    } else if (results.length > 0) {
      req.session.user = results[0]; // Almacenar información del usuario en la sesión
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Nombre de usuario o contraseña incorrectos' });
    }
  });
};
