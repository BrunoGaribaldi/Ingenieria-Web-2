const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


//para imagenes
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/Uploads/'); // Carpeta donde se guardan los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // nombre final del archivo
  }
});

const upload = multer({ storage: storage });
module.exports = { upload };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//validacion de las rutas con session
const session = require('express-session');
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Usa true solo si tienes HTTPS
}));

// Servir archivos estáticos
app.use(express.static("Public"));
app.use(bodyParser.json());

//para las rutas de usuario
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const adminRouter = require("./routes/adminRouter");
const reservaRouter = require("./routes/reservaRouter");

//este es el controller de main
const mainController = require("./controller/mainController");

//aca defino para que rutas las voy a delegar al router especifico
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/reserva", reservaRouter);

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
