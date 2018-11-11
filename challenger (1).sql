-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2018 at 07:59 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `challenger`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_one` int(11) NOT NULL,
  `user_second` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user_one`, `user_second`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 8, NULL, NULL, NULL),
(2, 1, 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `from_user_id`, `to_user_id`, `conversation_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, 'hello from player 1 to player 2', NULL, NULL),
(2, 2, 1, 2, 'hello player 1', NULL, NULL),
(3, 8, 1, 1, 'Hello user 1 from user 8', NULL, NULL),
(32, 2, 1, 2, 'hello again', NULL, NULL),
(33, 1, 2, 2, 'hello', NULL, NULL),
(34, 2, 1, 2, 'test', NULL, NULL),
(35, 2, 1, 2, 'aasdasdas', NULL, NULL),
(36, 2, 1, 2, 'asdasdasd', NULL, NULL),
(37, 1, 2, 2, 'testst', NULL, NULL),
(38, 2, 1, 2, 'testset', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2018_10_11_175116_create_positions_table', 1),
(4, '2018_10_11_175205_create_powers_table', 1),
(5, '2018_10_11_175304_create_user_power_table', 1),
(6, '2018_10_11_175304_create_power_user_table', 2),
(7, '2018_10_13_114558_create_position_user_table', 2),
(8, '2018_10_15_151902_create_teams_table', 3),
(9, '2018_10_15_152521_create_user_team_table', 4),
(11, '2018_10_15_152521_create_team_user_table', 5),
(12, '2018_10_15_152910_create_roles_table', 5),
(13, '2018_10_31_164953_create_notification_type_table', 5),
(14, '2018_10_31_165348_create_notification_table', 5),
(15, '2018_10_31_170538_create_notifications_table', 5),
(16, '2018_11_04_090408_create_user_friend_table', 6),
(17, '2018_11_08_225402_create_conversations_table', 7),
(18, '2018_11_08_225756_create_messages_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `notification_type_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_type`
--

CREATE TABLE `notification_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descriptions` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_type`
--

INSERT INTO `notification_type` (`id`, `name`, `descriptions`, `created_at`, `updated_at`) VALUES
(1, 'Gởi yêu cầu kết bạn', 'Gởi yêu cầu kết bạn', NULL, NULL),
(2, 'Gởi lời mời gia nhập nhóm', 'Lời mời gia nhập nhóm được gửi từ quản lý hoặc admin đội bóng', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(10) UNSIGNED NOT NULL,
  `PositionCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PositionName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `PositionCode`, `PositionName`, `Description`, `created_at`, `updated_at`) VALUES
(1, 'TĐ', 'Tiền Đạo', '. Những người chơi ở các vị trí này thường đứng gần khung thành của đối phương nhất, và do đó chủ yếu chịu trách nhiệm ghi bàn cho đội bóng của mình. ', NULL, NULL),
(2, 'TM', 'Thủ Môn', 'Vai trò chính của thủ môn là bảo vệ khung thành đội nhà và ngăn cản đối phương ghi bàn thắng.', NULL, NULL),
(3, 'HV', 'Hậu Vệ', 'Ngăn chặn cầu thủ đối phương, đặc biệt là tiền đạo, không cho ghi bàn, và đưa bóng ra khỏi khu vực cấm địa', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `position_user`
--

CREATE TABLE `position_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `position_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `TypeCode` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `position_user`
--

INSERT INTO `position_user` (`id`, `position_id`, `user_id`, `TypeCode`, `created_at`, `updated_at`) VALUES
(87, 1, 2, 'MP', NULL, NULL),
(88, 1, 1, 'MP', NULL, NULL),
(111, 2, 1, 'EP', NULL, NULL),
(113, 3, 2, 'EP', NULL, NULL),
(114, 1, 5, 'MP', NULL, NULL),
(116, 2, 8, 'MP', NULL, NULL),
(117, 3, 8, 'EP', NULL, NULL),
(118, 1, 9, 'MP', NULL, NULL),
(119, 1, 10, 'MP', NULL, NULL),
(120, 1, 11, 'MP', NULL, NULL),
(121, 1, 12, 'MP', NULL, NULL),
(122, 1, 13, 'MP', NULL, NULL),
(123, 1, 14, 'MP', NULL, NULL),
(124, 1, 15, 'MP', NULL, NULL),
(125, 1, 16, 'MP', NULL, NULL),
(126, 1, 17, 'MP', NULL, NULL);

--
-- Triggers `position_user`
--
DELIMITER $$
CREATE TRIGGER `add_position` AFTER INSERT ON `position_user` FOR EACH ROW UPDATE users
    		SET users.ExtraPosition = CASE
            	WHEN NEW.TypeCode = "EP" THEN (SELECT positions.PositionName FROM positions WHERE id = NEW.position_id)
            	ELSE users.ExtraPosition
            END,
            users.MainPosition = CASE
            	WHEN NEW.TypeCode = "MP" THEN (SELECT positions.PositionName FROM positions WHERE id = NEW.position_id)
            	ELSE users.MainPosition
            END
    		WHERE users.id = NEW.user_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_position` AFTER DELETE ON `position_user` FOR EACH ROW UPDATE users
    		SET users.ExtraPosition = CASE
            	WHEN old.TypeCode = "EP" THEN NULL
                ELSE users.ExtraPosition
            END,
            users.MainPosition = CASE
            	WHEN old.TypeCode = "MP" THEN NULL
            	ELSE users.MainPosition
            END
    		WHERE users.id = old.user_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_position` AFTER UPDATE ON `position_user` FOR EACH ROW UPDATE users
    		SET users.ExtraPosition = CASE
            	WHEN NEW.TypeCode = "EP" THEN (SELECT positions.PositionName FROM positions WHERE id = NEW.position_id)
            	ELSE users.ExtraPosition
            END,
            users.MainPosition = CASE
            	WHEN NEW.TypeCode = "MP" THEN (SELECT positions.PositionName FROM positions WHERE id = NEW.position_id)
            	ELSE users.MainPosition
            END
    		WHERE users.id = NEW.user_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `powers`
--

CREATE TABLE `powers` (
  `id` int(10) UNSIGNED NOT NULL,
  `PowerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `powers`
--

INSERT INTO `powers` (`id`, `PowerName`, `Description`, `position_id`, `created_at`, `updated_at`) VALUES
(1, 'Dứt điểm', 'Chỉ số mô tả khả năng dứt điểm của cầu thủ', 1, NULL, NULL),
(2, 'Sút xa', 'Chỉ số mô tả khả năng dứt điểm từ xa của cầu thủ', 1, NULL, NULL),
(3, 'Penalty', 'Chỉ số mô tả khả năng sút penalty của cầu thủ', 1, NULL, NULL),
(4, 'Bắt Bóng', 'Chỉ số mô tả khả năng bắt bóng của thủ môn', 2, NULL, NULL),
(5, 'Đổ người', 'Chỉ số mô tả khả năng đổ người của thủ môn', 2, NULL, NULL),
(6, 'Chọn vị trí', 'Chỉ số mô tả khả năng chọn vịtrí của thủ môn', 2, NULL, NULL),
(7, 'phản xạ', 'Chỉ số mô tả khả năng phản xạ của thủ môn', 2, NULL, NULL),
(8, 'phát bóng', 'Chỉ số mô tả khả năng phát bóng của thủ môn', 2, NULL, NULL),
(9, 'Thể Lực', 'Chỉ số miêu tả thể lực của cầu thủ', 1, NULL, NULL),
(10, 'Sút phạt', 'Chỉ số miêu tả khả năng sút phạt của cầu thủ', 1, NULL, NULL),
(11, 'Đánh đầu', 'Chỉ số miêu tả khả năng đánh đầu ghi bản của cầu thủ', 1, NULL, NULL),
(12, 'Chọn vị trí', 'Chỉ số miêu tả khả năng chọn vị trí của cầu thủ', 1, NULL, NULL),
(13, 'Tranh bóng', 'Chỉ số miêu tả khả năng tranh giành banh của cầu thủ', 1, NULL, NULL),
(14, 'Tốc độ', 'Chỉ số miêu tả tốc độ của cầu thủ', 1, NULL, NULL),
(15, 'Tạt bóng', 'Chỉ số miêu tả khả năng tạt bóng của cầu thủ', 1, NULL, NULL),
(16, 'Thể lực', 'Chỉ số mô tả thể lực cầu thủ', 3, NULL, NULL),
(17, 'Tốc độ', 'Chỉ số mô tả tốc độ của cầu thủ', 3, NULL, NULL),
(18, 'Xoạc bóng', 'Chỉ số mô tả kỹ năng xoạc bóng của cầu thủ', 3, NULL, NULL),
(19, 'Kèm người', 'Chỉ số mô tả khả năng kèm người của hậu vệ', 3, NULL, NULL),
(20, 'Tranh bóng', 'Chỉ số mô tả khả năng tranh bóng của hậu vệ', 3, NULL, NULL),
(21, 'Chuyền bóng', 'Chỉ số mô tả khả năng chuyền bóng của hậu vệ', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `power_user`
--

CREATE TABLE `power_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `power_id` int(11) NOT NULL,
  `self_point` int(11) DEFAULT NULL,
  `ViewStatus` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `power_user`
--

INSERT INTO `power_user` (`id`, `user_id`, `power_id`, `self_point`, `ViewStatus`, `created_at`, `updated_at`) VALUES
(16, 2, 1, 20, 0, NULL, NULL),
(17, 2, 2, 20, 1, NULL, NULL),
(18, 2, 3, 0, 1, NULL, NULL),
(19, 2, 9, 20, 1, NULL, NULL),
(20, 2, 10, 20, 1, NULL, NULL),
(21, 2, 11, 20, 1, NULL, NULL),
(22, 2, 12, 30, 1, NULL, NULL),
(23, 2, 13, 20, 1, NULL, NULL),
(24, 2, 14, 20, 1, NULL, NULL),
(25, 2, 15, 20, 1, NULL, NULL),
(505, 1, 1, 60, 1, NULL, NULL),
(506, 1, 2, 50, 1, NULL, NULL),
(507, 1, 3, 20, 1, NULL, NULL),
(508, 1, 9, 20, 0, NULL, NULL),
(509, 1, 10, 20, 1, NULL, NULL),
(510, 1, 11, 0, 1, NULL, NULL),
(511, 1, 12, 20, 1, NULL, NULL),
(512, 1, 13, 15, 1, NULL, NULL),
(513, 1, 14, 0, 1, NULL, NULL),
(514, 1, 15, 20, 1, NULL, NULL),
(527, 1, 4, 20, 1, NULL, NULL),
(528, 1, 5, 20, 1, NULL, NULL),
(529, 1, 6, 20, 1, NULL, NULL),
(530, 1, 7, 20, 1, NULL, NULL),
(531, 1, 8, 20, 1, NULL, NULL),
(532, 2, 16, 20, 1, NULL, NULL),
(533, 2, 17, 20, 1, NULL, NULL),
(534, 2, 18, 20, 1, NULL, NULL),
(535, 2, 19, 20, 1, NULL, NULL),
(536, 2, 20, 5, 1, NULL, NULL),
(537, 2, 21, 20, 1, NULL, NULL),
(548, 8, 4, 20, 1, NULL, NULL),
(549, 8, 5, 20, 1, NULL, NULL),
(550, 8, 6, 20, 1, NULL, NULL),
(551, 8, 7, 20, 1, NULL, NULL),
(552, 8, 8, 20, 1, NULL, NULL),
(571, 8, 16, 20, 1, NULL, NULL),
(572, 8, 17, 20, 1, NULL, NULL),
(573, 8, 18, 20, 1, NULL, NULL),
(574, 8, 19, 20, 1, NULL, NULL),
(575, 8, 20, 20, 1, NULL, NULL),
(576, 8, 21, 20, 1, NULL, NULL),
(577, 9, 1, 20, 1, NULL, NULL),
(578, 9, 2, 20, 1, NULL, NULL),
(579, 9, 3, 20, 1, NULL, NULL),
(580, 9, 9, 20, 1, NULL, NULL),
(581, 9, 10, 20, 1, NULL, NULL),
(582, 9, 11, 20, 1, NULL, NULL),
(583, 9, 12, 20, 1, NULL, NULL),
(584, 9, 13, 20, 1, NULL, NULL),
(585, 9, 14, 20, 1, NULL, NULL),
(586, 9, 15, 20, 1, NULL, NULL),
(587, 10, 1, 20, 1, NULL, NULL),
(588, 10, 2, 20, 1, NULL, NULL),
(589, 10, 3, 20, 1, NULL, NULL),
(590, 10, 9, 20, 1, NULL, NULL),
(591, 10, 10, 20, 1, NULL, NULL),
(592, 10, 11, 20, 1, NULL, NULL),
(593, 10, 12, 20, 1, NULL, NULL),
(594, 10, 13, 20, 1, NULL, NULL),
(595, 10, 14, 20, 1, NULL, NULL),
(596, 10, 15, 20, 1, NULL, NULL),
(597, 11, 1, 20, 1, NULL, NULL),
(598, 11, 2, 20, 1, NULL, NULL),
(599, 11, 3, 20, 1, NULL, NULL),
(600, 11, 9, 20, 1, NULL, NULL),
(601, 11, 10, 20, 1, NULL, NULL),
(602, 11, 11, 20, 1, NULL, NULL),
(603, 11, 12, 20, 1, NULL, NULL),
(604, 11, 13, 20, 1, NULL, NULL),
(605, 11, 14, 20, 1, NULL, NULL),
(606, 11, 15, 20, 1, NULL, NULL),
(607, 12, 1, 20, 1, NULL, NULL),
(608, 12, 2, 20, 1, NULL, NULL),
(609, 12, 3, 20, 1, NULL, NULL),
(610, 12, 9, 20, 1, NULL, NULL),
(611, 12, 10, 20, 1, NULL, NULL),
(612, 12, 11, 20, 1, NULL, NULL),
(613, 12, 12, 20, 1, NULL, NULL),
(614, 12, 13, 20, 1, NULL, NULL),
(615, 12, 14, 20, 1, NULL, NULL),
(616, 12, 15, 20, 1, NULL, NULL),
(617, 13, 1, 20, 1, NULL, NULL),
(618, 13, 2, 20, 1, NULL, NULL),
(619, 13, 3, 20, 1, NULL, NULL),
(620, 13, 9, 20, 1, NULL, NULL),
(621, 13, 10, 20, 1, NULL, NULL),
(622, 13, 11, 20, 1, NULL, NULL),
(623, 13, 12, 20, 1, NULL, NULL),
(624, 13, 13, 20, 1, NULL, NULL),
(625, 13, 14, 20, 1, NULL, NULL),
(626, 13, 15, 20, 1, NULL, NULL),
(627, 14, 1, 20, 1, NULL, NULL),
(628, 14, 2, 20, 1, NULL, NULL),
(629, 14, 3, 20, 1, NULL, NULL),
(630, 14, 9, 20, 1, NULL, NULL),
(631, 14, 10, 20, 1, NULL, NULL),
(632, 14, 11, 20, 1, NULL, NULL),
(633, 14, 12, 20, 1, NULL, NULL),
(634, 14, 13, 20, 1, NULL, NULL),
(635, 14, 14, 20, 1, NULL, NULL),
(636, 14, 15, 20, 1, NULL, NULL),
(637, 15, 1, 20, 1, NULL, NULL),
(638, 15, 2, 20, 1, NULL, NULL),
(639, 15, 3, 20, 1, NULL, NULL),
(640, 15, 9, 20, 1, NULL, NULL),
(641, 15, 10, 20, 1, NULL, NULL),
(642, 15, 11, 20, 1, NULL, NULL),
(643, 15, 12, 20, 1, NULL, NULL),
(644, 15, 13, 20, 1, NULL, NULL),
(645, 15, 14, 20, 1, NULL, NULL),
(646, 15, 15, 20, 1, NULL, NULL),
(647, 16, 1, 20, 1, NULL, NULL),
(648, 16, 2, 20, 1, NULL, NULL),
(649, 16, 3, 20, 1, NULL, NULL),
(650, 16, 9, 20, 1, NULL, NULL),
(651, 16, 10, 20, 1, NULL, NULL),
(652, 16, 11, 20, 1, NULL, NULL),
(653, 16, 12, 20, 1, NULL, NULL),
(654, 16, 13, 20, 1, NULL, NULL),
(655, 16, 14, 20, 1, NULL, NULL),
(656, 16, 15, 20, 1, NULL, NULL),
(657, 17, 1, 20, 1, NULL, NULL),
(658, 17, 2, 20, 1, NULL, NULL),
(659, 17, 3, 20, 1, NULL, NULL),
(660, 17, 9, 20, 1, NULL, NULL),
(661, 17, 10, 20, 1, NULL, NULL),
(662, 17, 11, 20, 1, NULL, NULL),
(663, 17, 12, 20, 1, NULL, NULL),
(664, 17, 13, 20, 1, NULL, NULL),
(665, 17, 14, 20, 1, NULL, NULL),
(666, 17, 15, 20, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LogoUrl` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `Name`, `Description`, `LogoUrl`, `created_at`, `updated_at`) VALUES
(1, 'Thành Viên', 'Thành viên của nhóm', '', NULL, NULL),
(2, 'Quản lý', 'Quản lý của đội bóng', '', NULL, NULL),
(3, 'Admin', 'Chủ đội bóng , người tạo đội bóng', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `TeamCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fullname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImgUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `WinRate` int(11) NOT NULL,
  `TotalScore` int(11) NOT NULL,
  `TotalMatch` int(11) NOT NULL,
  `TotalWin` int(11) NOT NULL,
  `TotalGoal` int(5) DEFAULT '0',
  `Ward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `TeamCode`, `Fullname`, `ImgUrl`, `WinRate`, `TotalScore`, `TotalMatch`, `TotalWin`, `TotalGoal`, `Ward`, `City`, `Description`, `Status`, `created_at`, `updated_at`) VALUES
(1, 'T001', 'Hutech UNITED', '../../assets/logo01.png', 0, 0, 0, 0, 0, 'Gò Vấp', 'TP.Hồ Chí Minh', 'Vui là chính', 0, '2018-10-15 08:50:39', '2018-10-15 08:50:39'),
(2, 'T002', 'Nothing Matter', '../../assets/logo02.png', 85, 10, 5, 4, 12, 'Quận 1', 'TP.Hồ Chí Minh', 'Win là 10', 0, '2018-10-15 08:53:41', '2018-10-15 08:53:41'),
(3, 'T003', 'We are one', '../../assets/logo03.jpg', 0, 0, 0, 0, 0, 'Quận 12', 'TP.Hồ Chí Minh', 'Không có gì hot', 0, '2018-10-15 08:53:42', '2018-10-15 08:53:42'),
(4, 'T0004', 'Team4', '../../assets/logo08.png', 0, 0, 0, 0, 0, '', '0', '', 0, '2018-10-17 07:56:14', '2018-10-17 07:56:14'),
(5, 'T0004', 'Team4', '../../assets/logo08.png', 0, 0, 0, 0, 0, '', '0', '', 0, '2018-10-17 07:59:40', '2018-10-17 07:59:40'),
(6, 'T0005', 'Team4', '../../assets/logo08.png', 0, 0, 0, 0, 0, '', '0', '', 0, '2018-10-17 07:59:41', '2018-10-17 07:59:41');

-- --------------------------------------------------------

--
-- Table structure for table `team_user`
--

CREATE TABLE `team_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_user`
--

INSERT INTO `team_user` (`id`, `user_id`, `team_id`, `position_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 3, NULL, NULL),
(2, 2, 1, 1, 1, NULL, NULL),
(3, 3, 2, 1, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `UserCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fullname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateOfBirth` datetime DEFAULT NULL,
  `Sex` tinyint(5) DEFAULT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Weight` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Height` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TotalMatches` int(11) DEFAULT NULL,
  `PhoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `City` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Ward` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ImgUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MainPosition` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ExtraPosition` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateCreated` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `UserCode`, `Username`, `password`, `Fullname`, `DateOfBirth`, `Sex`, `Email`, `Weight`, `Height`, `TotalMatches`, `PhoneNumber`, `City`, `Ward`, `Description`, `ImgUrl`, `MainPosition`, `ExtraPosition`, `DateCreated`, `email_verified_at`, `remember_token`, `status`, `created_at`, `updated_at`) VALUES
(1, 'user000001', 'user01', '123', 'Vương Vũ Anh Khôi', '1995-10-10 00:00:00', 0, 'anhkhoi592014@gmail.com', '60', '1m6', NULL, NULL, 'TP.Hồ Chí Minh', 'Quận Gò Vấp', 'sadasdasdasdasdasdasd31231231', '../../assets/player03.png', 'Tiền Đạo', 'Thủ Môn', NULL, NULL, NULL, 1, NULL, '2018-10-27 21:55:54'),
(2, 'user000002', 'user02', '123', 'Test Cái Nhẹ 2123123', '2005-10-19 00:00:00', 1, 'maithao592014@gmail.com', '45', '1m70', NULL, NULL, 'Hà Nội', 'Quận Bắc Từ Liêm', 'tes123123', '../../assets/player02.png', 'Tiền Đạo', 'Hậu Vệ', NULL, NULL, NULL, 0, NULL, '2018-10-28 00:47:52'),
(8, '54624', 'test01', '123123', 'Vương Vũ Anh Khôi', '1995-05-18 00:00:00', 0, 'a@yahoo.com', '85', '1m7', NULL, NULL, 'TP.Hồ Chí Minh', 'Quận Gò Vấp', 'This is text for test', '../../assets/player01.png', 'Thủ Môn', 'Hậu Vệ', NULL, NULL, NULL, 0, '2018-11-05 00:40:29', '2018-11-05 07:16:15'),
(9, '60895', 'user04', '123123', 'testcainhe', '1995-01-01 00:00:00', 0, 'huyrua@yahoo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 07:21:03', '2018-11-06 07:21:04'),
(10, '3614', 'user05', '123123', '123123', '1995-01-01 00:00:00', 0, '12@yahh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:01:24', '2018-11-06 08:01:25'),
(11, '57178', 'user06', '123123', '123123', '1995-01-01 00:00:00', 0, '12312@yahh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:01:40', '2018-11-06 08:01:41'),
(12, '46855', 'user07', '123123', '123123', '1995-01-01 00:00:00', 0, '11212312@yahh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:01:52', '2018-11-06 08:01:53'),
(13, '83582', 'user08', '123123', '123123', '1995-01-01 00:00:00', 0, 'test@asdasdasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:02:15', '2018-11-06 08:02:16'),
(14, '7488', 'user09', '123123', 'asdasdasd', '1995-01-01 00:00:00', 0, 'asd@yaho', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:02:48', '2018-11-06 08:02:49'),
(15, '37272', 'user10', '123123', 'asdasdasd', '1995-01-01 00:00:00', 0, 'asd@yahoasdasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:03:01', '2018-11-06 08:03:02'),
(16, '25034', 'user11', '123123', 'asdasdasd', '1995-01-01 00:00:00', 0, 'asd@yahoasdasd123123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:03:11', '2018-11-06 08:03:12'),
(17, '76912', 'user17', '123123', '123123', '1995-01-01 00:00:00', 0, '1221@yah', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '../../assets/unknown.jpg', 'Tiền Đạo', NULL, NULL, NULL, NULL, 0, '2018-11-06 08:32:31', '2018-11-06 08:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `user_friend`
--

CREATE TABLE `user_friend` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_friend`
--

INSERT INTO `user_friend` (`id`, `user_id`, `friend_id`, `created_at`, `updated_at`) VALUES
(9, 2, 11, NULL, NULL),
(10, 11, 2, NULL, NULL),
(15, 1, 11, NULL, NULL),
(16, 11, 1, NULL, NULL),
(29, 2, 1, NULL, NULL),
(30, 1, 2, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_type`
--
ALTER TABLE `notification_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `positions_positioncode_unique` (`PositionCode`),
  ADD UNIQUE KEY `positions_positionname_unique` (`PositionName`);

--
-- Indexes for table `position_user`
--
ALTER TABLE `position_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `powers`
--
ALTER TABLE `powers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `power_user`
--
ALTER TABLE `power_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_user`
--
ALTER TABLE `team_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_usercode_unique` (`UserCode`),
  ADD UNIQUE KEY `users_username_unique` (`Username`),
  ADD UNIQUE KEY `users_email_unique` (`Email`);

--
-- Indexes for table `user_friend`
--
ALTER TABLE `user_friend`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_type`
--
ALTER TABLE `notification_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `position_user`
--
ALTER TABLE `position_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `power_user`
--
ALTER TABLE `power_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `team_user`
--
ALTER TABLE `team_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_friend`
--
ALTER TABLE `user_friend`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
