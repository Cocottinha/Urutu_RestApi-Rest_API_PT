const express = require('express');
const Tecnica_FTIR = require("../modelos/Tecnica_FTIR");
const Tecnica = require("../modelos/Tecnica");
const Tecnica_FTIR_Diretorio = require("../modelos/Tecnica_FTIR_Diretorio");
const app = express();




app.get("/ftir", async (req, res)   => {

    const tecnicaFtir = await Tecnica_FTIR.findAll({ include: [{ model: Tecnica}] });
    const tecnicaFtirDiretorio = await Tecnica_FTIR_Diretorio.findAll({include: [{model: Tecnica_FTIR}]});

    res.render("visualizar_entidades_do_banco/tecnica_FTIR", { tecnicaFtir, tecnicaFtirDiretorio});
});



module.exports = app;