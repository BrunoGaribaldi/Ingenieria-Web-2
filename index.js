const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static("Public"));

//para las rutas de usuario
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const adminRouter = require("./routes/adminRouter");

//este es el controller de main
const mainController = require("./controller/mainController");

//aca defino para que rutas las voy a delegar al router especifico
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);

//aca vamos a mostrar la vistas principales

app.get("/", mainController.home);
app.get("/about-us", mainController.aboutUs);
app.get("/my-account", mainController.myAccount);

//esto es solo para saber si se conecto correctamente a la bd
const db = require("./models/index");
async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("Conexión con la base de datos establecida.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}

testConnection();

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
