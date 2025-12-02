-- Setează codificarea implicită pentru toate conexiunile noi
SET GLOBAL character_set_client = utf8mb4;
SET GLOBAL character_set_connection = utf8mb4;
SET GLOBAL character_set_results = utf8mb4;
SET GLOBAL character_set_server = utf8mb4;
SET GLOBAL collation_server = utf8mb4_unicode_ci;

-- Creează baza de date cu codificarea corectă
CREATE DATABASE IF NOT EXISTS aviatiei
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
