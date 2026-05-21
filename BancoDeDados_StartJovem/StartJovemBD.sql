Create database StartJovem;

use  StartJovem;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('aprendiz', 'monitor', 'gestor') NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('ativa', 'encerrada') DEFAULT 'ativa',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE turma_aprendizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT,
    aprendiz_id INT,

    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (aprendiz_id) REFERENCES usuarios(id)
);


CREATE TABLE turma_monitores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT,
    monitor_id INT,

    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (monitor_id) REFERENCES usuarios(id)
);

CREATE TABLE monitoramentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT,
    monitor_id INT,
    aprendiz_id INT,
    observacao TEXT,
    status ENUM('bom', 'atencao', 'critico') DEFAULT 'bom',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (monitor_id) REFERENCES usuarios(id),
    FOREIGN KEY (aprendiz_id) REFERENCES usuarios(id)
);


