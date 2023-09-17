CREATE DATABASE bd_kaizen_fitness;

USE bd_kaizen_fitness;

-- TABELA MÃE
CREATE TABLE tb_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(255),
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    dt_nascimento DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255),
    estado VARCHAR(255),
    cidade VARCHAR(255)
);

-- TABELA FILHA PARA USUÁRIOS PROFISSIONAIS
CREATE TABLE tb_usuario_profissional (
    id_usuario_profissional INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNIQUE,
    cpf_ou_cnpj VARCHAR(20) NOT NULL,
    ind_tipo_pessoa ENUM('Física', 'Jurídica') NOT NULL,
    tipo_servico VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

-- TABELA FILHA PARA USUÁRIOS CONSUMIDORES
CREATE TABLE tb_usuario_consumidor (
    id_usuario_consumidor INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNIQUE,
    cpf VARCHAR(14) NOT NULL,
    peso DECIMAL(5,2),
    altura DECIMAL(3,2),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

select * from tb_usuario;
select * from tb_usuario_consumidor;
