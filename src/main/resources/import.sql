

INSERT INTO authority(name) values('ROLE_ADMIN');
INSERT INTO authority(name) values('ROLE_USER');


INSERT INTO language(id,name) values(1,'Undefined');
INSERT INTO language(id,name) values(2,'Java');
INSERT INTO language(id,name) values(3,'JavaScript');

--ADMIN
--password: admin
--usernmae: admin
INSERT INTO user( id, username, password, firstname, lastname, phone, email, address, anumber, city, country, image, role, authority_id, status) values(1, 'admin', '$2a$10$2nUwyYdXRxhKio6aVrwsVOXlUqSs9XnsIndPiyT.3AphhvZ/UYBta', 'Nina', 'Simic', '0641789544', 'ninasimicns@gmail.com', 'Dusana Danilovica','7', 'Novi Sad', 'Serbia', null, 'ADMIN', 1, 'APPROVED');

-- USER
--username: ver
--password: ver
INSERT INTO user( id, username, password, firstname, lastname, phone, email, address, anumber, city, country, image, role, authority_id, status) values(2, 'ver', '$2a$10$SmLd5yKXvmiPdb03xmDoJO.0O/urG3vLsYT5W2MB5UadLCr8V7BoG', 'Nenad', 'Zoric', '063471147', 'ver@gmail.com', 'Reja','54', 'Wroclaw', 'Poland', null, 'USER', 2, 'APPROVED');

