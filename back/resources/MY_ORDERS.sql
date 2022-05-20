-- -------------------------------------------------------------
-- TablePlus 4.6.6(422)
--
-- https://tableplus.com/
--
-- Database: MY_ORDERS
-- Generation Time: 2022-05-18 18:35:14.3340
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `zip` int NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` int DEFAULT NULL,
  `code_chantier` varchar(255) DEFAULT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3d3e29e99d821fd75d7cb117e04` (`clientId`),
  CONSTRAINT `FK_3d3e29e99d821fd75d7cb117e04` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `paid_per_day` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `operator`;
CREATE TABLE `operator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `companyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a8eb62659dfb7dbe980f7ba46b8` (`companyId`),
  CONSTRAINT `FK_a8eb62659dfb7dbe980f7ba46b8` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_chargement` datetime NOT NULL,
  `date_dechargement` datetime NOT NULL,
  `price` int NOT NULL,
  `produit` varchar(255) NOT NULL,
  `info` varchar(900) DEFAULT NULL,
  `clientId` int NOT NULL,
  `addressId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9b27855a9c2ade186e5c55d1ec3` (`clientId`),
  KEY `FK_73f9a47e41912876446d047d015` (`addressId`),
  CONSTRAINT `FK_73f9a47e41912876446d047d015` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`),
  CONSTRAINT `FK_9b27855a9c2ade186e5c55d1ec3` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `order_operators_operator`;
CREATE TABLE `order_operators_operator` (
  `orderId` int NOT NULL,
  `operatorId` int NOT NULL,
  PRIMARY KEY (`orderId`,`operatorId`),
  KEY `IDX_7df2119679a00f8648259408bf` (`orderId`),
  KEY `IDX_3261f1ce57651e998ef4d52bab` (`operatorId`),
  CONSTRAINT `FK_3261f1ce57651e998ef4d52babe` FOREIGN KEY (`operatorId`) REFERENCES `operator` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_7df2119679a00f8648259408bfc` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `address` (`id`, `city`, `zip`, `street`, `number`, `code_chantier`, `clientId`) VALUES
(1, 'Caen', 14000, 'Rue', NULL, NULL, 1),
(2, 'Caen', 14000, 'Rue2', NULL, NULL, 1),
(3, 'Le Havre', 76600, 'Rue', NULL, NULL, 2),
(4, 'Pau', 64000, 'Rue', NULL, NULL, 3);

INSERT INTO `client` (`id`, `name`, `surname`, `phone`) VALUES
(1, 'Nom', 'Client1', '556985236'),
(2, 'Nom', 'Client2', '4853212'),
(3, 'Nom', 'Client3', '896122363');

INSERT INTO `company` (`id`, `name`, `city`, `zip`, `phone`, `paid_per_day`) VALUES
(1, 'Entreprise1', 'Caen', '14000', '5698742', 0),
(2, 'Entreprise2', 'Le Havre', '76600', '7842369523', 1),
(3, 'Entreprise3', 'Pau', '64000', '5594452123', 1);

INSERT INTO `operator` (`id`, `name`, `surname`, `phone`, `companyId`) VALUES
(1, 'Nom', 'Chauffeur1', '658874562', 1),
(2, '', 'Chauffeur2', '6697842322', 1),
(3, '', 'Chauffeur3', '44932233', 2);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;