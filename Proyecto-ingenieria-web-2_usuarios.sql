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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `rol` varchar(45) DEFAULT 'usuario',
  `password` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (6,'raul','perez','pablo@gmail.com','3888655555','usuario','$2b$10$1pXq1Cm8g416q94evIDyI.jVYDfT5h/iCFOYOPZldcA1pwba0vyx.'),(7,'raul','perez','joaquin@gmail.com','3888655555','usuario','$2b$10$NXAOZsC1MzJTxedL8FKmr.CLiBZ/lGaz65QPI6zkFrr0Tb5yhgVpq'),(8,'bruno','garubaldu','bruno@gmail.com','3888655555','usuario','$2b$10$yBt2oxisAz4IFgo1tRf9IOxVztgmKP/1PjMgKy8FnGfXyvlPmBL9C'),(13,'pjiojoijoij','koijoijiojiojj','joaqun@gmail.com',NULL,'usuario','$2b$10$RVkckeo9r96UzP4tYFmnb.Q1Tjr.O3UZfVyr0Ar6aBdyoKLbvYTOG'),(14,'okoko','koijoijiojiojj','jun@gmail.com',NULL,'usuario','$2b$10$mC9Zva4znrEwrvrFU80bDeRMGPiquIGI/A2GRYOtIw337Capj7Fem'),(15,'raul ','cernik','raulcernik@gmail.com',NULL,'usuario','$2b$10$4ple1qvOAQe0vyWeOHDFneVImwE/PqUagsD9rKbinm0oGXPGueoGW'),(16,'raul ','cernik','rlcernik@gmail.com',NULL,'usuario','$2b$10$FvVIZaJO8gsQavayBSLTG.lpf6vusWVmqb2.d7vCmhGx0zSZt2wxi'),(17,'raul ','cernik','rlcerik@gmail.com',NULL,'usuario','$2b$10$VhC4imjRB5lX52yxLsKLpOSkHor6n6NsCYd/sKoPjKq8qN7DeOTo.'),(18,'raul kpokp','cernik','rlrik@gmail.com',NULL,'usuario','$2b$10$TZ8gnqtegui84sR4KsxjJ.vrXYW96YozySS5CY0GPaxa4YHn9jl9a'),(19,'raul kpokp','cernik','rlnnnnnnrik@gmail.com',NULL,'usuario','$2b$10$kveG7ApgQyqEs1psG0wTkOXAbEvP154vAuW7ix3AQ9QjXQRca3kFe'),(20,'raul kpokp','cernik','rlnnnnniiinrik@gmail.com',NULL,'usuario','$2b$10$VwN3RZqVCb0CXDkB3GP1bebml4sjgaZFhaft95jU0elO/2Yx7.MWO'),(21,'raul kpokp','cernik','rloiinrik@gmail.com',NULL,'usuario','$2b$10$f8aZWM2nSIoBWjj/E7kkmew6L/MDAcXjELp189ls7/Ddl.2YgAs0u'),(22,'raulpatopro','cernik','rloiiknrik@gmail.com',NULL,'usuario','$2b$10$SMMyIYMf3uLObTjksXFTqOyRrUl2fc4N1oog8sIA8tVzVlGj9Lof2'),(23,'raulpatopro','cernik','popopop@gmail.com',NULL,'usuario','$2b$10$LTdFci6gARsvqNRzoaZYe.GoOfWuIiHmVogMYCY3NYHx8J8i.MAkW'),(24,'raulpatopro','cernik','ppop@gmail.com',NULL,'usuario','$2b$10$cbiSQh103FgFvGKDfdtld.uiujsC9SCVYFxWdkCoDvpKxkH/x2TYm'),(25,'raulpatopro','cernik','ppoiiiiip@gmail.com',NULL,'usuario','$2b$10$u3O2zmGDbCYGXqZsMsS5HOQW.A.yv84aaGB.vWfI0N3NDvr5ILQJi'),(27,'admin','admin','admin@gmail.com',NULL,'admin','$2b$10$svgqaFq0jXsthzfaQGSx9etQQgQartOzuQQfEDXsKX9xYAiqq/Ex2'),(28,'prueba','prueba','lalala@gmail.com',NULL,'usuario','$2b$10$IAJq1mOt3ez0wAizKwUkMu4K4ljlQRiZ2pFIDVOauSjbhveRX.nnS'),(29,'pato','pro','patopro@gmail.com',NULL,'usuario','$2b$10$oJeOF9wNTbPMr15/CyD2RumjjnPSGlS7DpUio6oDnraj8PKaJIRCu'),(30,'aron','cernik','aroncernik@gmail.com',NULL,'usuario','$2b$10$37HToIAqvuQUAlgv4MawFO9aKbgm37os416Ank/oUTEnKBFcRWyJC'),(31,'aron','cernik','aroncernik2@gmail.com',NULL,'usuario','$2b$10$hAJmkXYQEnsZWD4xAja1K.d7jp9bkXhhjD4kfI2Htf0tWNBCxdSty'),(32,'aron','cernik','aroncernik4@gmail.com',NULL,'usuario','$2b$10$e6xtg9s0x6xI0Zz6ws3GYunUJPqdJAC54MsW14TcQKShMvTJA3BQ6'),(33,'aron','cernik','aroncernik5@gmail.com',NULL,'usuario','$2b$10$dYNIjrDW.wdrBOhWDEFmduPfjuyBCrj0Oh96AuCSJztPEgiaZ4itu'),(34,'juan pablo','perez','jpe@gmail.com',NULL,'usuario','$2b$10$1OTmZx2uA1lxPbtTUbFhHecN7O9ZnNarmofhRqGPc.zE9l0aIS6VC');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
