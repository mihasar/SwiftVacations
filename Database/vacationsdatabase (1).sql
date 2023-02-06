-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2023 at 10:56 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(33, 7),
(33, 2),
(57, 6),
(57, 9),
(57, 11),
(57, 5),
(57, 10),
(57, 3),
(57, 7),
(57, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(4, 'Loren', 'Kore', 'lorenkore@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(5, 'Joe', 'Cole', 'joecole@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(6, 'michael', 'Sar', 'misar2000@gmail.com', 'f045fbddcd44021947fd473553225dd212c3581ae3d96ff60343890101becf8452a9df1ec45e17b1c8e35df5be926293fe6a213abfa5475d152639e2a646e21c', 'Admin'),
(7, 'Jake', 'Palavra', 'jake@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Paris, France', '  Known as the \"City of Love,\" Paris is famous for its romantic atmosphere, iconic landmarks such as the Eiffel Tower and Notre-Dame Cathedral, and world-renowned museums like the Louvre.', '2023-02-04', '2023-02-12', '950.00', 'b26e9af0-9ed7-43dc-9e05-e81cfca673e2.jpg'),
(2, 'Maldives', 'Famous for crystal clear waters, white sandy beaches and tropical climate, Maldives is a dream destination for many beach and water sports enthusiasts.', '2023-04-12', '2023-04-20', '990.00', '9417ca73-5617-4b31-bfa3-9a0bc8c81176.jpg'),
(3, 'Bali, Indonesia', 'Known for its beautiful beaches, temples, and vibrant culture, Bali is a popular destination for both relaxation and adventure.', '2023-04-23', '2023-04-30', '2100.00', 'a29c9918-1e0f-4f18-97c9-0c15679fe305.jpg'),
(4, 'Tokyo, Japan', 'Japan\'s bustling capital city is known for its vibrant nightlife, delicious food and cutting-edge technology.', '2023-03-03', '2023-03-12', '3000.00', '94b995c7-cf38-45e7-840c-01b40450c338.jpg'),
(5, 'New York City, USA', 'The city that never sleeps, New York is known for its skyscrapers, Broadway shows, and famous landmarks such as the Statue of Liberty and Central Park.', '2023-03-14', '2023-03-20', '4500.00', '153e8d42-d7b4-44ef-83b6-4c62550bd52f.webp'),
(6, 'Santorini, Greece', 'This island in the Aegean Sea is famous for its stunning sunsets, white-washed buildings, and blue-domed churches.', '2023-05-15', '2023-05-21', '1500.00', '78fe9fa2-c8b5-4838-a5d0-f61e690983ff.webp'),
(7, 'Sydney, Australia', 'Known for its iconic Opera House and Harbour Bridge, Sydney is a popular destination for its beaches, culture and bustling city life.', '2023-02-15', '2023-02-28', '4200.00', '87316d64-efb1-4066-b265-855ba2b454fc.jpg'),
(8, 'Cancun, Mexico', 'Known for its beautiful beaches and turquoise waters, Cancun is a popular destination for spring breakers and tourists looking to relax in the sun.', '2023-06-15', '2023-06-30', '3999.00', '32a57017-2110-4a32-a234-af4ce2031d36.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
