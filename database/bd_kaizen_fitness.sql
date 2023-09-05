CREATE DATABASE bd_kaizen_fitness;

USE bd_kaizen_fitness;

CREATE TABLE tb_usuario (
    id_usuario INT PRIMARY KEY,
    nome VARCHAR(255),
    sobrenome VARCHAR(255),
    dt_nascimento DATE,
    estado VARCHAR(255),
    cidade VARCHAR(255)
);

CREATE TABLE tb_usuario_profissional (
    id_profissional INT PRIMARY KEY,
    id_usuario INT,
    cpf_cnpj VARCHAR(14), 
    ind_tipo_pessoa CHAR(1),
    tipo_servico VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

CREATE TABLE tb_usuario_consumidor (
    id_consumidor INT PRIMARY KEY,
    id_usuario INT,
    cpf VARCHAR(11),
    peso DECIMAL(5, 2),
    altura DECIMAL(5, 2),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);