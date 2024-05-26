const mysql = require('mysql');
const pool = require('./db');
/*const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bnzve7u85ayzvikbqeyv-mysql.services.clever-cloud.com',
  user: 'uropn9e9cvmdds7p',
  password: 'uUYO7d6lHxekrXu9dyXh',
  database: 'bnzve7u85ayzvikbqeyv'
});*/

exports.getAllClientes = (req, res) => {
  const query = `
    SELECT 
    cliente.id_cliente, 
    cliente.Nombre, 
    cliente.Apellido, 
    cliente.Correo, 
    cliente.Celular, 
    cliente.id_consulta,
    consulta.fecha_consulta,
    consulta.tipo_consulta
  FROM cliente
    JOIN consulta ON cliente.id_consulta = consulta.id_consulta
  `;
  
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    } else {
      res.json(results);
    }
  });
};

exports.getClienteById = (req, res) => {
  const { id_cliente } = req.params;
  const query = `
    SELECT 
    cliente.id_cliente, 
      cliente.Nombre, 
      cliente.Apellido, 
      cliente.Correo, 
      cliente.Celular, 
      cliente.id_consulta,
      consulta.fecha_consulta,
      consulta.tipo_consulta
    FROM cliente
    JOIN consulta ON cliente.id_consulta = consulta.id_consulta
    WHERE cliente.id_cliente = ?
  `;
  
  pool.query(query, [id_cliente], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener el cliente' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cliente no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

exports.createCliente = (req, res) => {
  const { Nombre, Apellido, Correo, Celular, id_consulta } = req.body;
  pool.query('INSERT INTO cliente (Nombre, Apellido, Correo, Celular, id_consulta) VALUES (?, ?, ?, ?, ?)', 
    [Nombre, Apellido, Correo, Celular, id_consulta], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al crear el cliente', mysqlError: error.message });
      } else {
        res.status(201).json({ message: 'Cliente creado exitosamente', id: results.insertId });
      }
  });
};

exports.updateCliente = (req, res) => {
  const { Nombre, Apellido, Correo, Celular, id_consulta } = req.body;
  const { id_cliente } = req.params;
  pool.query('UPDATE cliente SET Nombre = ?, Apellido = ?, Correo = ?, Celular = ?, id_consulta = ? WHERE id_cliente = ?', 
    [Nombre, Apellido, Correo, Celular, id_consulta, id_cliente], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente', mysqlError: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Cliente no encontrado' });
      } else {
        res.json({ message: 'Cliente actualizado exitosamente' });
      }
  });
};

exports.deleteCliente = (req, res) => {
  const { id_cliente } = req.params;
  pool.query('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el cliente', mysqlError: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.json({ message: 'Cliente eliminado exitosamente' });
    }
  });
};
