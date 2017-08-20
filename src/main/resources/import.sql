

--insert into authority (name) values ('ROLE_ADMIN');
--insert into authority (name) values ('ROLE_OWNER');


INSERT INTO language(id,name) values(1,'Undefined');
INSERT INTO language(id,name) values(2,'Java');
INSERT INTO language(id,name) values(3,'JavaScript');


--password: admin
--usernmae: admin
INSERT INTO user(id, username, password, firstname, lastname, phone, email, address, address_numb, city, country, image_url, role) values(1, 'admin', 'admin', 'Nina', 'Simic', 'jnjk', 'ninasimicns@gmail.com', 'Dusana Danilovica','7', 'Novi Sad', 'Serbia', 'images/img1.jpg', 'ADMIN');

