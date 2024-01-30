const express = require('express');
const Projeto = require("../modelos/Projeto");

const app = express();

app.get("/projeto", async (req, res)   => {

    const projeto = await Projeto.findAll();   
    res.render("visualizar_entidades_do_banco/projeto", { projeto});
});

app.post("/projeto/delete", (req,res) => {
    
    var id = req.body.id;

    Projeto.destroy({
        where: {
            id_projeto: id
        }
    })
    res.redirect("/projeto");

});

module.exports = app;