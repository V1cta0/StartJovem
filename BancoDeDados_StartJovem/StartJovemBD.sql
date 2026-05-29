CREATE DATABASE IF NOT EXISTS StartJovem;

drop database startjovem;

USE StartJovem;

-- =====================================================
-- USUÁRIOS
-- =====================================================

CREATE TABLE usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    tipo ENUM(
        'aprendiz',
        'monitor',
        'gestor'
    ) NOT NULL,

    status ENUM(
        'ativo',
        'inativo'
    ) DEFAULT 'ativo',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- TURMAS
-- =====================================================

CREATE TABLE turmas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    status ENUM(
        'ativa',
        'encerrada'
    ) DEFAULT 'ativa',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- APRENDIZ -> TURMA
-- Um aprendiz só pode estar em uma turma
-- =====================================================

CREATE TABLE turma_aprendizes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    turma_id INT NOT NULL,

    aprendiz_id INT NOT NULL,

    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(aprendiz_id),

    FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE CASCADE,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE

);

-- =====================================================
-- MONITOR -> TURMA
-- =====================================================

CREATE TABLE turma_monitores (

    id INT AUTO_INCREMENT PRIMARY KEY,

    turma_id INT NOT NULL,

    monitor_id INT NOT NULL,

    UNIQUE(turma_id, monitor_id),

    FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE CASCADE,

    FOREIGN KEY (monitor_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE

);

-- =====================================================
-- MONITORAMENTOS
-- =====================================================

CREATE TABLE monitoramentos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    turma_id INT NOT NULL,

    monitor_id INT NOT NULL,

    aprendiz_id INT NOT NULL,

    observacao TEXT,

    status ENUM(
        'bom',
        'atencao',
        'critico'
    ) DEFAULT 'bom',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (turma_id)
        REFERENCES turmas(id),

    FOREIGN KEY (monitor_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id)

);

-- =====================================================
-- GESTÃO DE APRENDIZ
-- =====================================================

CREATE TABLE gestao_aprendiz (

    id INT AUTO_INCREMENT PRIMARY KEY,

    aprendiz_id INT NOT NULL,

    turma_id INT NOT NULL,

    monitor_id INT,

    desempenho ENUM(
        'excelente',
        'bom',
        'regular',
        'critico'
    ) DEFAULT 'bom',

    frequencia INT DEFAULT 100,

    status_aprendiz ENUM(
        'ativo',
        'atencao',
        'desligado'
    ) DEFAULT 'ativo',

    observacoes TEXT,

    atualizado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (turma_id)
        REFERENCES turmas(id),

    FOREIGN KEY (monitor_id)
        REFERENCES usuarios(id)

);

-- =====================================================
-- TEMPO DE TRABALHO
-- =====================================================

CREATE TABLE tempo_trabalho (

    id INT AUTO_INCREMENT PRIMARY KEY,

    aprendiz_id INT NOT NULL UNIQUE,

    segundos_totais INT DEFAULT 0,

    atualizado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id)

);

-- =====================================================
-- PRODUTIVIDADE SEMANAL
-- =====================================================

CREATE TABLE produtividade (

    id INT AUTO_INCREMENT PRIMARY KEY,

    aprendiz_id INT NOT NULL,

    dia_semana ENUM(
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab',
        'Dom'
    ) NOT NULL,

    produtividade INT DEFAULT 0,

    criado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id)

);

-- =====================================================
-- TAREFAS
-- =====================================================

CREATE TABLE tarefas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    aprendiz_id INT NOT NULL,

    titulo VARCHAR(255) NOT NULL,

    descricao TEXT,

    status ENUM(
        'fazer',
        'progresso',
        'concluido'
    ) DEFAULT 'fazer',

    criado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id)

);



CREATE TABLE presencas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    aprendiz_id INT NOT NULL,

    turma_id INT NOT NULL,

    presente BOOLEAN DEFAULT TRUE,

    data_presenca DATE NOT NULL,

    FOREIGN KEY (aprendiz_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (turma_id)
        REFERENCES turmas(id)

);