const express = require('express');
const session = require('express-session');
const clienteRoutes = require('./routes/clienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const personalRoutes = require('./routes/personalRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const tokenSeguimientoRoutes = require('./routes/tokenSeguimientoRoutes');
const app = express();
const PORT = process.env.PORT || 3001;
const pool = require('./controllers/db');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // aqui vamos a poner el link del homepage en el front 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next(); 
});


app.use(session({
  secret: 'Roberto-severich-toke1245', //token o llave secreta para las cookies
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } //men aqui cambiamos a server 
}));

app.use(express.json());

app.use('/api', clienteRoutes);
app.use('/api', consultaRoutes);
app.use('/api', personalRoutes);
app.use('/api', servicioRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', tokenSeguimientoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor API REST corriendo en el puerto http://localhost:${PORT}`);
});
