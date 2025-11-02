CREATE TABLE countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  official_name VARCHAR(255) NOT NULL,
  flag_svg TEXT,
  flag_png TEXT,
  flag_alt TEXT,
  capital VARCHAR(255),
  region VARCHAR(255),
  subregion VARCHAR(255),
  population INT,
  area FLOAT,
  languages TEXT,
  currencies TEXT,
  lat FLOAT,
  lng FLOAT,
  country_code VARCHAR(10)
);
