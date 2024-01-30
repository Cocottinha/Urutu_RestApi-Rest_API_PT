const connection = require("./database/database");
const express = require('express')
const app = express()

const formidable = require('formidable')
const ControlerPrincipal = require("./controles/ControlerPrincipal");
const ControlerProjeto = require("./controles/ControlerProjeto");
const ControlerPonto = require("./controles/ControlerPonto");
const ControlerTecnica = require("./controles/ControlerTecnica");
const ControlerTecnica_MO = require("./controles/ControlerTecnica_MO");
const ControlerTecnica_FTIR = require("./controles/ControlerTecnica_FTIR");
const ControlerTecnica_XRF = require("./controles/ControlerTecnica_XRF");


const form = new formidable.IncomingForm()
const fs = require('fs')


const bodyParser = require("body-parser");

app.set('view engine', 'ejs')
app.use(express.static('public'))

connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Usando rotas de outro arquivo
app.use("/", ControlerPrincipal);
app.use("/", ControlerProjeto);
app.use("/", ControlerPonto);
app.use("/", ControlerTecnica);
app.use("/", ControlerTecnica_MO);
app.use("/", ControlerTecnica_FTIR);
app.use("/", ControlerTecnica_XRF);



app.listen(3000, () => {
    console.log("O servidor está rodando!");
});

