const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('Public'));


//para las rutas de usuario
const userRouter = require('./routes/userRouter')

//este es el controller de main
const mainController = require("./controller/mainController")

//aca defino para que rutas las voy a delegar al router especifico
app.use("/user",userRouter)

//aca vamos a mostrar la vista home
app.get('/',mainController.home);

//esto es solo para saber si se conecto correctamente a la bd
const db = require('./models/index');
async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión con la base de datos establecida.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

testConnection();



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
