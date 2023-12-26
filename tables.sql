create schema if not exists emco;
use emco;

drop table if exists users;
create table users(
    id varchar(255) primary key not null,
    username varchar(255) unique not null,
    password varchar(255) not null
);

drop table if exists profiles;
create table profiles(
    id varchar(255) primary key not null,
    userId varchar(255) not null,
    fullname varchar(255) not null,
    email varchar(255) unique not null,
    phone varchar(10) unique not null,
    photo varchar(255) not null,
    socialMedia json not null,
    registeredAt date not null,
    schoolId varchar(255) not null,
    major varchar(255) not null,
    semester int not null,
    foreign key (userId) references users(id) on delete cascade on update cascade
);