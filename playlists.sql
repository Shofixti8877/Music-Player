-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2017 at 05:31 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(20, 'RHCP', './songs/images/RHCP-cali.jpg', '[{\"url\":\".\\/songs\\/Californication\\/01 Around the World.mp3\",\"name\":\"Around the World\"},{\"url\":\".\\/songs\\/Californication\\/02 Parallel Universe.mp3\",\"name\":\"Parallel Universe\"},{\"url\":\".\\/songs\\/Californication\\/03 Scar Tissue.mp3\",\"name\":\"scar tissue\"},{\"url\":\".\\/songs\\/Californication\\/04 Otherside.mp3\",\"name\":\"Otherside\"},{\"url\":\".\\/songs\\/Californication\\/05 Get On Top.mp3\",\"name\":\"Get On Top\"},{\"url\":\".\\/songs\\/Californication\\/06 Californication.mp3\",\"name\":\"Californication\"},{\"url\":\".\\/songs\\/Californication\\/07 Easily.mp3\",\"name\":\"Easily\"},{\"url\":\".\\/songs\\/Californication\\/08 Porcelain.mp3\",\"name\":\"Porcelain\"}]'),
(22, 'Foo Fighters - ESP&G', 'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0019/5219/brand.gif?itok=TT0LCgkj', '[{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/01-The Pretender.mp3\",\"name\":\"The Pretender\"},{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/02-Let It Die.mp3\",\"name\":\"Let It Die\"},{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/03-Erase Replace.mp3\",\"name\":\"Erase Replace\"},{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/04-Long Road To Ruin.mp3\",\"name\":\"Long Road To Ruin\"},{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/05-Come Alive.mp3\",\"name\":\"Come Alive\"},{\"url\":\".\\/songs\\/Foo Fighters-ESP&G\\/06-Stranger Things Have Happened.mp3\",\"name\":\"Stranger Things Have Happened\"}]'),
(26, 'Within Temptation Q-Sessions', 'https://i.scdn.co/image/47d1099c733e2739706eaccfe0773e8a125dd576', '[{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[01] Grenade.mp3\",\"name\":\"Grenade\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[02] Titanium.mp3\",\"name\":\"Titanium\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[03] Let Her Go.mp3\",\"name\":\"Let Her Go\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[04] Summertime Sadness.mp3\",\"name\":\"Summertime Sadness\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[05] Radioactive.mp3\",\"name\":\"Radioactive\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[06] Crazy.mp3\",\"name\":\"Crazy\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[07] Dirty Dancer.mp3\",\"name\":\"Dirty Dancer\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[08] Don\'t You Worry Child.mp3\",\"name\":\"Don\'t You Worry Child\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[09] Behind Blue Eyes.mp3\",\"name\":\"Behind Blue Eyes\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[10] The Power Of Love.mp3\",\"name\":\"The Power Of Love\"},{\"url\":\".\\/songs\\/Within Temptation - Q Music Sessions\\/[11] Apologize.mp3\",\"name\":\"Apologize\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
