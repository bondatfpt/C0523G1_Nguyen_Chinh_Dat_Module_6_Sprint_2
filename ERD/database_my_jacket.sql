create database my_jacket;
use my_jacket;

create table sizes (
id int primary key auto_increment,
`name` varchar(50),
`is_deleted` bit(1) default 0
);

create table colors (
id int primary key auto_increment,
`name` varchar(50),
`is_deleted` bit(1) default 0
);

create table category (
id int primary key auto_increment,
`name` varchar(50),
`is_deleted` bit(1) default 0
);
create table products (
id int primary key auto_increment,
`name` varchar(100) not null,
price double not null,
image varchar(255),
amount int,
`is_deleted` bit(1) default 0,
size_id int,
color_id int,
category_id int,
foreign key (size_id)references sizes(id),
foreign key (color_id)references colors(id),
foreign key (category_id)references category(id)
);

create table `roles`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);

create table genders (
id int primary key auto_increment,
`name` varchar(50),
`is_deleted` bit(1) default 0
);

create table `location`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);

create table `accounts`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `user_name` varchar(100),
    `password` varchar(100),
    `birthday` date,
    `email` varchar(100),
    `phone_number` varchar(15),
    `money` double,
    `regis_date` datetime,
    `avatar` varchar(100),
    `role_id` int,
    `gender_id` int,
    `location_id` int,
   	foreign key (`role_id`) references `roles`(`id`),   
  	foreign key (`gender_id`) references `genders`(`id`),
    foreign key (`location_id`) references `location`(`id`),  
    `is_deleted` bit(1) default 0
);

create table orders (
`id` int primary key auto_increment,
`is_deleted` bit(1) default 0,
total_price double,
order_date datetime,
product_id int,
account_id int,
foreign key (`product_id`) references `products`(`id`),   
foreign key (`account_id`) references `accounts`(`id`)
)










