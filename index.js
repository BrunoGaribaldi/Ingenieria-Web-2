const express = require('express');
const app = express();
const port = 3000;

//para las rutas de usuario
const userRouter = require('./routes/userRouter')

//este es el controller de main
const mainController = require("./controller/mainController")

//aca defino para que rutas las voy a delegar al router especifico
app.use("/user",userRouter)

//aca vamos a mostrar la vista home
app.get('/', mainController.home);




app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
