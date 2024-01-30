const express = require('express');
const Tecnica_MO = require("../modelos/Tecnica_MO");
const Tecnica_MO_Imagem = require("../modelos/Tecnica_MO_Imagem");
const Tecnica = require("../modelos/Tecnica");

const app = express();




app.get("/mo", async (req, res)   => {

    const tecnicaMo = await Tecnica_MO.findAll({ include: [{ model: Tecnica}] });
    const tecnicaMoImagem = await Tecnica_MO_Imagem.findAll({include: [{model: Tecnica_MO}]});

    res.render("visualizar_entidades_do_banco/tecnica_MO", { tecnicaMo, tecnicaMoImagem});
});



module.exports = app;

