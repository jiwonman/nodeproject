create table Google(
user_id varchar(255) not null,
displayName varchar(50) not null,
email varchar(50) not null,
verified tinyint(1) not null,
email_verified tinyint(1) not null,
provider varchar(50) not null
);

create table user(
user_id varchar(50) not null,
user_pw varchar(255) not null,
salt varchar(255) not null,
displayName varchar(50) not null
);

