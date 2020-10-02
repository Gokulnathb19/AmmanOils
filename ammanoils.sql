-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2020 at 04:02 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ammanoils`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `tel` text NOT NULL,
  `wa` text NOT NULL,
  `fb` text NOT NULL,
  `twitter` text NOT NULL,
  `insta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contact_id`, `email`, `tel`, `wa`, `fb`, `twitter`, `insta`) VALUES
(1, 'abc@gmail.com', '9626944214', '9626944214', '', '', 'https://www.instagram.com/amman_oils/');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile_no` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_transactions`
--

CREATE TABLE `customer_transactions` (
  `transaction_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `updated_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `short_desc` varchar(30) NOT NULL,
  `long_desc` longtext NOT NULL,
  `product_image_name` varchar(40) NOT NULL,
  `product_price` float NOT NULL,
  `product_price_2` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `short_desc`, `long_desc`, `product_image_name`, `product_price`, `product_price_2`) VALUES
(1, 'Ground Nut Oil', 'Cooking Oil', 'Groundnuts or peanuts are a popular source of food throughout the world . Groundnut oil have good aroma and taste .we will buy the groundnuts directly from farmers and then we will remove the stones and waste particles . after filtration we will extract the oil .\r\n\r\nBenefits :\r\n\r\nGroundnut oil may reduce heart disease risk factors. It may also help improve insulin sensitivity and lower blood sugar in people with diabetes. It is also a great source of vitamin E, a powerful antioxidant that protects the body from free radical damage.', 'product1.jpg', 200, 400),
(2, 'Gingelly Oil', 'Cooking Oil', 'Gingelly oil is a kind of edible oil derived from sesame seeds. It is mainly used as a flavor enhancer in China, Korea, Japan, Middle East and Southeast Asia for cuisine, and also cooking oil in South India. \r\n\r\nBenefits: \r\n\r\nIt contains antioxidants like sesamol, semamolin etc.The high linoleic acid, which is good to soften blood vessels and prevent diseases caused by angiosclerosis.', 'product2.jpg', 100, 200),
(3, 'Coconut Oil', 'Cooking Oil', 'Coconut oil is extracted from dry coconut .We are producing sulphur free coconut oil. The processing requires that the meat be extracted from the shell and dried in sunlight to create copra.The copra is pressed along with cardamom, producing the coconut oil .The cardamom will give good aroma and also helps for digestion.\r\n\r\nBenefits:\r\n\r\nThe fatty acids in coconut oil can encourage the body to burn fat, and they provide quick energy to the body and brain. They also raise HDL (good) cholesterol in the blood, which may help to reduce heart disease risk. Also have some potential benefits for skin, including reducing inflammation, keeping skin moisturized and helping heal wounds.', 'product3.jpg', 200, 400),
(4, 'Castor Oil', 'Cooking Oil', 'Castor oil is gotten from processing the castor seeds. After harvesting, the seeds are allowed to dry so that the seed hull will split open, releasing the seed inside. The oil is usually extracted by cold-pressing the seed, squeezing out the oil and then filtering to remove the dusts. \r\n\r\nBenefits :\r\n\r\none of the best-known medicinal uses for castor oil is as a natural laxative. Castor oil is rich in ricinoleic acid, a monounsaturated fatty acid.These types of fats act as humectants and can be used to moisturize the skin. Castor oil has several qualities that may help reduce acne symptoms. Castor oil has antifungal properties and may help fight off dental issues like plaque overgrowth, gum infections and root canal infections ,keeping the mouth healthy.', 'product4.jpg', 300, 600);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
(1, 'Admin', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customer_transactions`
--
ALTER TABLE `customer_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_transactions`
--
ALTER TABLE `customer_transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
