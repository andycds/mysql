const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
app.use(express.json());

/*
Crie um arquivo .env com o seguinte conteúdo:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=hospital
*/

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

app.get("/medicos", (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    connection.query('select * from tb_medico;', (err, results, fields) => {
        // console.log(results);
        // console.log(fields);
        res.json(results);
    });
});

app.get("/pacientes", (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    connection.query('select * from tb_paciente;', (err, results, fields) => {
        res.json(results);
    });
});

app.post('/medicos', (req, res) => {
    const crm = req.body.crm;
    const nome = req.body.nome;
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    const query = "insert into tb_medico (crm, nome) values (?, ?);"
    connection.query(query, [crm, nome], (error, results, fields) => {
        console.log(query);
        console.log(error);
        res.send('ok');
    });
});

app.get('/consultas', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    const sql = `
        SELECT m.nome as nome_medico, c.data_hora, p.nome as nome_paciente
        FROM tb_medico m, tb_consulta c, tb_paciente p
        WHERE m.crm = c.crm AND c.cpf = p.cpf
    `;
    connection.query(sql, (err, results, fields) => {
        res.json(results);
    });
});

const porta = 3000;
app.listen(porta, () => console.log(`Escutando na porta ${porta}`));