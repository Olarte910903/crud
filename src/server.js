const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const connectionBd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'users'
});

app.use(express.json()); // Analizar el cuerpo de la solicitud como JSON
app.use(express.urlencoded({ extended: true })); // Analizar el cuerpo de la solicitud codificado en URL
app.use(cors());


connectionBd.connect((err)=>{
  if(err){
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos !');
});

let consulta = 'SELECT * FROM clientes';

app.get('/datos', (req,res)=>{
  connectionBd.query(consulta, (error, results)=>{
    if(error){
      console.log('Error al consultar datos desde la base de datos: ', error);
      res.status(500).send('Error en el servidor ');
      return;
    }
    res.json(results);
  });
});

// app.post('/datos', (req, res) => {
//   // Acceder a los datos del cuerpo de la solicitud
//   const datos = req.body;

//   const consultax = "INSERT INTO clientes (id, nombre, empresa) VALUES (2, 'maria', 'Avemaría Publicidad')"

//   connectionBd.query(consultax, [datos.id, datos.nombre, datos.empresa], (error, results) =>{
//     if(error){
//       console.log('Error al crear datos en la base de datos: ', error);
//       res.status(500).send('Error en el servidor');
//       return;
//     }
//     res.status(201).send('Datos creados correctamente');
//   });

//   // Hacer algo con los datos
//   // ... 

//   // Enviar una respuesta
//   res.send('Solicitud POST recibida');
// });


app.post('/datos', (req, res) => {
  // Acceder a los datos del cuerpo de la solicitud
  const datos = req.body;

  const consultaInsercion = 'INSERT INTO clientes (id, nombre, empresa) VALUES (?, ?, ?)';
  connectionBd.query(consultaInsercion, [datos.id, datos.nombre, datos.empresa], (error, results) => {
    if (error) {
      console.log('Error al crear datos en la base de datos: ', error);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    res.status(201).json({ message: 'Datos creados correctamente' });
  });
});




app.listen(3000, ()=>{
  console.log('Servidor Express ha iniciado en el puerto 3000');
});

