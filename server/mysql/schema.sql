USE `RealDeal` ;

CREATE TABLE IF NOT EXISTS `RealDeal`.`user` (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL UNIQUE,
  password  varchar(50) NOT NULL UNIQUE,
  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS `RealDeal`.`savedPlaces` (
  id varchar(100) NOT NULL,
  image_url varchar(100),
  name  varchar(100),
  url varchar(100),
  rating  decimal(10, 2),
  location_address1 varchar(100),
  location_city  varchar(100),
  location_zip_code  varchar(100),
  userId  int,
  PRIMARY KEY (ID),
  FOREIGN KEY (userId) REFERENCES `RealDeal`.`user`(id)
);
