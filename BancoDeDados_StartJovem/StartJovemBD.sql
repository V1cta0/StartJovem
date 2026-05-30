create database StartJovem;

use startJovem;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    tipo ENUM('aprendiz','gestor')
);

CREATE TABLE turma_aprendizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT NOT NULL,
    aprendiz_id INT NOT NULL
);;

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

DROP TABLE IF EXISTS registros_tempo_dia;
DROP TABLE IF EXISTS tempo_trabalho;
DROP TABLE IF EXISTS produtividade;
CREATE TABLE produtividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT,
    dia_semana VARCHAR(20),
    minutos INT DEFAULT 0,
    data_registro DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tempo_trabalho (
    aprendiz_id INT PRIMARY KEY,
    segundos_totais INT DEFAULT 0,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tempo_trabalho (aprendiz_id, segundos_totais) VALUES 
(1, 0),
(2, 0)
ON DUPLICATE KEY UPDATE segundos_totais = segundos_totais;

-- ============================================
-- VERIFICAR SE TUDO FOI CRIADO
-- ============================================
SHOW TABLES;
SELECT * FROM tempo_trabalho;