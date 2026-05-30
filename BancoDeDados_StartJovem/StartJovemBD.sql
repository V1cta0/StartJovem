create database StartJovem;

use startJovem;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    tipo ENUM('aprendiz','gestor')
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT
);

CREATE TABLE turma_aprendizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT,
    aprendiz_id INT
);

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT,
    titulo VARCHAR(255),
    descricao TEXT,
    status VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tempo_trabalho (
    aprendiz_id INT PRIMARY KEY,
    segundos_totais INT DEFAULT 0
);

CREATE TABLE produtividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT,
    produtividade INT
);