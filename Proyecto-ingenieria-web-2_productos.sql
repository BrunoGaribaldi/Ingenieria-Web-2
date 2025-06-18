-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: Proyecto-ingenieria-web-2
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(45) DEFAULT NULL,
  `descripcion` varchar(450) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `genero` enum('hombre','mujer','unisex') DEFAULT NULL,
  `foto` varchar(450) DEFAULT NULL,
  `categoria` enum('remera','zapatilla','abrigo','accesorio','pantalon') DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (16,'Hat','uhhiuhu','gorra alce','unisex','foto-1748353907083-749424492.jpeg','accesorio',20000.00),(17,'Hat','','gorra tero','unisex','foto-1748354078526-629860953.jpeg','accesorio',20000.00),(18,'Hat','','Gorra gatito','unisex','foto-1748354150627-461355854.jpeg','accesorio',20000.00),(19,'Oassian','Disponibles desde el talle S-XL','Campera corta ecocuero','mujer','foto-1748354527046-792221266.jpeg','abrigo',30000.00),(21,'This week','','sweater britanico','hombre','foto-1748355007398-511895342.jpeg','abrigo',59500.00),(22,'This week','Talles S-XL, colores azul y beige','sweater algodon ROB','hombre','foto-1748355124119-97737797.jpeg','abrigo',59500.00),(23,'This week','Cremolatti','Buzo granizado con oreo','hombre','foto-1748355341958-390195194.jpeg','abrigo',67500.00),(24,'Oassian','Colores rojo,amaillo, blanco disponibles','Buzo corderito LILY','mujer','foto-1748355250244-264944790.jpeg','abrigo',35000.00),(25,'Diosa Luna','','Jean MOM negro estatico','mujer','foto-1748355446291-595516767.jpeg','pantalon',45000.00),(26,'This week','','Sweater DEAL','hombre','foto-1748355491388-16449094.jpeg','abrigo',59500.00),(27,'Oassian','','Buzo rustico MORZINE','mujer','foto-1748355720090-629141478.jpeg','abrigo',44000.00),(28,'Zohue','Promocion ','jeans sueltos','mujer','foto-1748355897620-903409274.jpeg','pantalon',25000.00),(29,'Zohue','','Tapado DIONISIA','mujer','foto-1748355992009-65359037.jpeg','abrigo',79000.00),(30,'Zohue','','Campera RYAN','mujer','foto-1748356057588-753864314.jpeg','abrigo',83000.00),(31,'Oassian','','Campera jean DENALI','mujer','foto-1748356103054-856938844.jpeg','abrigo',73000.00),(32,'This week','','Sweater MILANO','hombre','foto-1748356140405-893491864.jpeg','abrigo',62000.00),(33,'This week','','Campera red','hombre','foto-1748356202490-991078348.jpeg','abrigo',56000.00),(34,'Zohue','','Blazer ','mujer','foto-1748356234773-88816054.jpeg','abrigo',65000.00),(35,'Mistral','','Sweaters mistral colores','hombre','foto-1748356531191-306528288.jpeg','abrigo',50000.00),(36,'Mistral','','Sweater algodon Rojo','hombre','foto-1748356570911-722878442.jpeg','abrigo',56000.00),(37,'Mistral','','Chomba rayada ','hombre','foto-1748356609976-865033646.jpeg','remera',45000.00),(38,'Mistral','','Chomba one stripe','hombre','foto-1748356643079-155356439.jpeg','remera',45000.00),(39,'Mistral','','Remeras plain','hombre','foto-1748356669156-213569736.jpeg','remera',30000.00),(40,'Red Cross','','Remera WAY OUT','hombre','foto-1748356700558-601165835.jpeg','remera',23000.00),(41,'inside','','Remera SAY IT LOUD','hombre','foto-1748356741675-167975964.jpeg','remera',23000.00),(42,'This week','','Campera red striped','hombre','foto-1748356786960-764944129.jpeg','abrigo',50000.00),(43,'Oassian','','Buzo verde','mujer','foto-1748356818108-534660503.jpeg','abrigo',43000.00),(44,'This week','','Campera verde','hombre','foto-1748356851952-94657460.jpeg','abrigo',65000.00),(45,'Red Cross','','Remera NEY YORK','hombre','foto-1748356886721-493317238.jpeg','remera',20000.00),(46,'Inedita','','Remera lisas','mujer','foto-1748356922523-132977518.jpeg','remera',13000.00),(47,'This week','','Cintos','hombre','foto-1748356957218-803838440.jpeg','accesorio',23000.00),(48,'This week','','Remera FLAG','hombre','foto-1748356991958-97997184.jpeg','remera',18000.00),(49,'This week','','Remera white','hombre','foto-1748357022001-895416402.jpeg','remera',17000.00),(50,'Red Cross','','Remera SEVEN UP','hombre','foto-1748357055303-523293314.jpeg','remera',23000.00),(51,'zapatillarda','','zapatilla black','hombre','foto-1748358193849-894368710.jpg','zapatilla',68000.00),(53,'This week','','boina inglesa','unisex','foto-1748885779276-489289202.jpeg','accesorio',5000.00),(54,'This week','GOrro y bufanda','Gorro con cuellitos','unisex','foto-1748891240605-582271549.jpeg','accesorio',10000.00),(55,'This week','COlores rojo, verde y azul','Gorras corderoy','unisex','foto-1748891463065-456080337.jpeg','accesorio',15000.00),(56,'ninuihui','uihiuhhi','hhuihuih','mujer','foto-1750166051864-575313802.png','remera',22552.00);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 12:48:00
