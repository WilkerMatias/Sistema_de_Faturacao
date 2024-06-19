create database wakito;
use wakito;

create table users(
id_user int primary key auto_increment,
nome varchar(50) not null,
senha varchar(50) not null,
tipo enum('Administrador','Funcionário') not null
);

create table produtos(
id_produto int primary key auto_increment,
nome varchar(50) not null,
descricao text,
categoria varchar(50) not null,
preco_unit float(10,2) not null,
estoque int not null
);

create table faturas (
id_fatura int primary key auto_increment,
id_user int not null,
foreign key (id_user) references users(id_user),
data_fatura datetime default current_timestamp,
total float(10,2) not null
);

create table fatura_detalhes (
id_detalhe int primary key auto_increment,
id_fatura int not null,
foreign key (id_fatura) references faturas(id_fatura),
id_produto int not null,
foreign key (id_produto) references produtos(id_produto),
quantidade int not null,
preco_unit float(10,2) not null
);
