const express = require('express');
const Tecnica = require('../modelos/Tecnica');

const app = express();




app.get("/tecnica", async (req, res)   => {

    const tecnica = await Tecnica.findAll();   
    res.render("visualizar_entidades_do_banco/tecnica", { tecnica});
});



module.exports = app;
  