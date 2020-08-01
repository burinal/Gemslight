CREATE TABLE IF NOT EXISTS accorsys_extensions_users (
  ID int(11) not null auto_increment,
	USER_ID int not null,
	MODULE_ID varchar(255) not null,
	SESSION_ID varchar(255) not null,
	TIMESTAMP_X TIMESTAMP not null,
	primary key (ID)
)ENGINE = MYISAM  AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS accorsys_extensions (
  ID int(11) not null auto_increment,
	MODULE_ID varchar(255) not null,
	HASH varchar(255) not null,
	EXTENSIONS longtext not null,
	primary key (ID)
)ENGINE = MYISAM  AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS accorsys_license_buy (
  ID int(11) not null auto_increment,
	MODULE_ID varchar(255) not null,
	LICENSE_TYPE_ID varchar(255) not null,
	QTY BIGINT not null,
	EXPIRE_DATE varchar(50) not null,
	primary key (ID)
)ENGINE = MYISAM  AUTO_INCREMENT=1;


INSERT INTO `accorsys_extensions` (`MODULE_ID`, `EXTENSIONS`) VALUES
('accorsys.localization', 'a:1:{i:0;a:2:{s:4:"TYPE";s:4:"user";s:5:"VALUE";i:1;}}')

