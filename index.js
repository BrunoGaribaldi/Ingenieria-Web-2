const express = require('express');
const app = express();
const port = 3000;

//para las rutas de usuario


//aca vamos a mostrar la vista home
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});




app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
