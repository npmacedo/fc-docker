const express = require('express')
const mysql = require('mysql')
const Chance = require('chance');
const chance = new Chance();

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql.createConnection(config)

function createTable(){
    const sql = `create table if not exists people(
        id int not null auto_increment,
        name varchar(255),
        primary key(id)
    )`;
    connection.query(sql)
}

function insertName(name){
    const sql = `insert into people (name) values ('${name}')`
    connection.query(sql)    
}

function getNames(){
    const sql = "select id, name from people"
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

createTable()
insertName(chance.first())

app.get('/', (req, res) => {
    const sql = "select id, name from people"
    connection.query(sql, function (err, result, fields) {
        const names = `<ul>${result.map(row=>`<li>${row.name}</li>`).join('')}</ul>`
        res.send(`<h1>Full Cycle</h1> ${names}`)
    });    
})

app.listen(port, ()=>{
    console.log('rodando na porta ' + port)    
})