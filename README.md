# Ingenieria-Web-2
# Tienda de Productos Web

Este proyecto es una aplicación web para la visualización y gestión de productos, desarrollada con **Node.js**, **Express**, **Sequelize** y **MySQL**. 

## Funcionalidades Principales
# Cliente
--> Visualizar productos
--> Agregar productos a carrito de compras
--> Agregar productos a favoritos
--> Filtrar productos por genero, categoria, precio.
--> Login/Signup/Logout
# Administrador
--> Visualizar metricas
--> Agregar/eliminar/editar productos
--> Visualizar clientes
--> Visualizar pedidos

## Requisitos

Antes de comenzar, asegurate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- [MySQL](https://www.mysql.com/) (o el motor de base de datos que estés utilizando)
- [Git](https://git-scm.com/) (opcional pero recomendado)

## Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalá las dependencias del proyecto:
```bash
npm install
```
4. Crear la base de datos utilizando los archivos ubicados en Registros para BD de Prueba.

5. Configurar el archivo config.json
```bash
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

7. Iniciar la Aplicacion.
```bash
node index.js
```

9. Abrí tu navegador y accedé a: http://localhost:3000


Estructura basica del proyecto 
.
├── controllers/        # Lógica de negocio
├── models/             # Definiciones de modelos Sequelize
├── public/             # Archivos estáticos (CSS, JS, imágenes)
├── routes/             # Rutas Express
├── views/              # Vistas HTML
├── index.js            # Archivo principal del servidor
├── Config              # Configuraciones
└── package.json        # Dependencias y scripts
  

