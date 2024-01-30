const express = require('express');
const Ponto = require("../modelos/Ponto");

const app = express();


app.get("/ponto", async (req, res)   => {

    const ponto = await Ponto.findAll();   
    res.render("visualizar_entidades_do_banco/ponto", { ponto});
});

module.exports = app;
