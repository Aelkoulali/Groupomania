-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_id` int NOT NULL,
  `Post_id` int DEFAULT NULL,
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_id` (`User_id`),
  KEY `Post_id` (`Post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`Post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (10,10,7,'Bonsoir Malika, bonsoir Sarah, ',NULL,'2022-04-09 21:43:28','2022-04-09 22:18:57'),(11,10,7,'100% d\'accord avec Sarah !!',NULL,'2022-04-09 21:43:48','2022-04-09 21:43:48'),(12,15,7,'Bonsoir à tous,',NULL,'2022-04-09 21:46:50','2022-04-09 21:46:50'),(16,12,8,'C\'est mon rêve d\'y aller !!',NULL,'2022-04-09 22:10:21','2022-04-09 22:10:21');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_id` int NOT NULL,
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_id` (`User_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (7,12,'Bonsoir, devinez où j\'ai passé mes vacances ?','Marrakech1649540012234.jpg','2022-04-09 21:33:32','2022-04-09 21:33:32'),(8,15,'Pour moi, c\'était Kyoto au Japon !! ','Kyoto1649542131225.jpg','2022-04-09 22:08:51','2022-04-09 22:08:51');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'','','','$2b$10$GYrImvhooIhJCA5OBJXRgOop6dexWkAbh/zpd5kx/Nb/66PCsC69S',NULL,0,'2022-03-21 13:19:14','2022-03-21 13:19:14'),(2,'Tom','White','tom@groupomania.com','$2b$10$4OQn8cH.YhY7qRg50GVKZuwA8NU3w4Uuojj7CSQ8zoqnXii2xmCey',NULL,0,'2022-03-21 13:27:01','2022-03-21 13:27:01'),(3,'Tom','White','Twhite@goupomania.com','$2b$10$IjXeUYgPHhK9aVHEGKiQpeJLnw7abfm7h13s/oBEKcioNOkcDnz/e',NULL,0,'2022-03-22 07:44:32','2022-03-22 07:44:32'),(4,'Tom','White','twhite@groupomania.com','$2b$10$z1Yka2X58SxMM.39VbPDzearZ8ZmmWG6NaYsD8tnP4kikhgaEv3hm','happy-employees-21648398497753.jpg',0,'2022-03-22 15:53:12','2022-03-27 16:28:17'),(9,'Admin','Groupomania','admin@groupomania.com','$2b$10$bJwAFGUvecGqg2gwveUAaeobvZtGXOEJm35YmGqwX53TXYVXVhZcK','Admin1649513863647.png',1,'2022-04-05 09:45:12','2022-04-09 14:17:43'),(10,'Ali','Nour','anour@groupomania.com','$2b$10$5d7qbpqL5C9uLWiLb0U1yuNM5Nh7NUeaWLKr.oy3GCx5IPVkyB0gy','Ali1649538683022.jpg',0,'2022-04-09 21:09:27','2022-04-09 21:11:23'),(12,'Malilka','Taj','mtaj@groupomania.com','$2b$10$GoAqYJbB7nsJIRcZWBTWXO/ZXeQTrGWJkYQu8deOhlKqLVK7Mt2P.','Malika1649539052278.jpg',0,'2022-04-09 21:16:59','2022-04-09 21:17:32'),(13,'Sarah','Bell','sbell@groupomania.com','$2b$10$Iub8twBoLnNPDRe5mKl2lu9gyF/DKm.LWtjFNiby3XAzaAh/U68Y6','Sarah1649539315524.jpg',0,'2022-04-09 21:18:32','2022-04-09 21:21:55'),(14,'Midori','Abe','mabe@groupomania.com','$2b$10$SxzG91bWXI6qTd7OvpDvYOO5ohqtVXsnBKn6jJOzOnFOG83Qne6gi','Midori1649539424199.jpg',0,'2022-04-09 21:23:07','2022-04-09 21:23:44'),(15,'Amirah','Jones','ajones@groupomania.com','$2b$10$f06OsAerlJa.Pp2wYu7gp.kEQvQh39LoiGRzg/5OYJrxj/Hpnm91G','Amirah1649541174585.jpg',0,'2022-04-09 21:24:51','2022-04-09 21:52:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-16 13:47:27