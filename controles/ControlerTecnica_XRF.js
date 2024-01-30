const express = require('express');
const Tecnica_XRF = require("../modelos/Tecnica_XRF");
const Tecnica_XRF_Diretorio = require("../modelos/Tecnica_XRF_Diretorio");
const Tecnica = require("../modelos/Tecnica");

const app = express();




app.get("/xrf", async (req, res)   => {

    const tecnicaXrf = await Tecnica_XRF.findAll({ include: [{ model: Tecnica}] });
    const tecnicaXrfDiretorio = await Tecnica_XRF_Diretorio.findAll({include: [{model: Tecnica_XRF}]});


    res.render("visualizar_entidades_do_banco/tecnica_XRF", { tecnicaXrf, tecnicaXrfDiretorio });
});



module.exports = app;