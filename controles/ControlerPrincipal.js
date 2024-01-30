const express = require('express');

const Projeto = require("../modelos/Projeto");
const Ponto = require('../modelos/Ponto');
const Tecnica = require('../modelos/Tecnica');

const Tecnica_MO = require('../modelos/Tecnica_MO');
const Tecnica_MO_Imagem = require('../modelos/Tecnica_MO_Imagem');

const Tecnica_FTIR = require("../modelos/Tecnica_FTIR");
const Tecnica_FTIR_Diretorio = require('../modelos/Tecnica_FTIR_Diretorio');

const Tecnica_XRF = require("../modelos/Tecnica_XRF");
const Tecnica_XRF_Diretorio = require('../modelos/Tecnica_XRF_Diretorio');

const app = express();


app.post('/JsonUrutu', async (req, res) => {
    try
    {
        const jsonRecebido = req.body;

        const { NomeImagem, X, Y, DiretorioDoProjeto } = jsonRecebido;

        const projetoCriado = await Projeto.create({
            nome_imagem         : NomeImagem,
            diretorio_imagem    : DiretorioDoProjeto,
            largura_imagem      : X,
            altura_imagem       : Y
        });

        const { Pontos } = jsonRecebido;
        
        console.log(Pontos);
        
        Pontos.forEach(async ponto => {
            const { IdPonto, ...pontoSemId } = ponto;

            var novoPonto = await Ponto.create({
                nome_ponto  : pontoSemId.Nome,
                posicao_x   : pontoSemId.X,
                posicao_y   : pontoSemId.Y
            });

            if (Array.isArray(pontoSemId.AnaliseTecnica)) {
                pontoSemId.AnaliseTecnica.forEach(async techobj => {
                    
                    var tecnica = await Tecnica.create();
                    
                    switch(techobj.$type)
                    {
                        case "MO":

                            var tecMo = await Tecnica_MO.create({
                                aumento           : techobj.aumento,
                                data              : techobj.data,
                                comentario        : techobj.comentario,
                                resultado         : techobj.resultado,
                                tonalidade        : techobj.tonalidade,
                                nome_tecnica      : techobj.nomeDaTecnica,
                                TecnicaIdTecnica  : tecnica.id_tecnica    
                            });

                            if(tecMo.id_tecnica_mo != undefined)
                            {
                                if(Array.isArray(techobj.imagensEObjetivas))
                                {
                                    techobj.imagensEObjetivas.forEach(async tecnicaMoImagem => {
                                        var {diretorio, objetiva} = tecnicaMoImagem;

                                        var tecImagemMo = await Tecnica_MO_Imagem.create({
                                            diretorio               : diretorio,
                                            objetiva                : objetiva,
                                            tecnicaMoIdTecnicaMo    : tecMo.id_tecnica_mo
                                        });
                                    });                                
                                }
                            }
                        break;

                        case "FTIR":

                            var tecFtir = await Tecnica_FTIR.create({
                                tempo                   : techobj.tempo,
                                intervalo               : techobj.intervalo,
                                resolucao               : techobj.resolucao,
                                data                    : techobj.data,
                                comentario              : techobj.comentario,
                                resultado               : techobj.resultado,
                                tonalidade              : techobj.tonalidade,
                                nome_tecnica            : techobj.nomeDaTecnica,
                                TecnicaIdTecnica        : tecnica.id_tecnica    
                            });

                            if(tecFtir.id_tecnica_FTIR != undefined){
                                

                                 await Tecnica_FTIR_Diretorio.create({
                                 
                                    diretorio_arquivo           : techobj.diretorio,
                                    TecnicaFTIRIdTecnicaFTIR    : tecFtir.id_tecnica_FTIR
                                })
                            }
                        break;

                        case "XRF":
                            var tecXrf = await Tecnica_XRF.create({
                                tempo                   : techobj.tempo,
                                voltagem                : techobj.tensao,
                                corrente                : techobj.corrente,
                                calibracao              : techobj.calibracao,
                                colimador               : techobj.colimador,
                                data                    : techobj.data,
                                comentario              : techobj.comentario,
                                resultado               : techobj.resultado,
                                tonalidade              : techobj.tonalidade,
                                nome_tecnica            : techobj.nomeDaTecnica,
                                TecnicaIdTecnica        : tecnica.id_tecnica 

                            });

                            if(tecXrf.id_tecnica_xrf != undefined){

                                await Tecnica_XRF_Diretorio.create({

                                    diretorio_arquivo_xrf: techobj.diretorio,
                                    TecnicaXRFIdTecnicaXrf: tecXrf.id_tecnica_xrf    
                                })
                            }



                    }
                    novoPonto.addTecnica(tecnica);
                });
            }
            projetoCriado.addPonto(novoPonto);

        });


        res.send("Recebido sem erro!");

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao processar o JSON' });
}
});

//app.get('/fileUpload', (req, res) => {
 //   res.render('index')
//})
/*
app.post('/arquivos/fileUpload', (req, res) => {
    form.parse(req, (err, fields, files) => {
        const path = require('path')
       
        files.filetoupload.forEach((f) => {
            var oldpath = f.filepath
            console.log("Nome antigo: ", oldpath)
            var newpath = path.join(__dirname, 'uploads/', f.newFilename + f.originalFilename.substring(f.originalFilename.length - 4, f.originalFilename.length))
            console.log("novo path: ", newpath)
            fs.renameSync(oldpath, newpath)
        }).then(() =>{
            res.send('Upload do(s) arquivo(s) com sucesso!')

         }).catch((erro) => {
            res.send(erro);
         })
        
    })
});*/

app.post('/enviarJson', async (req, res) => {
    try {
        const jsonTexto = req.body.jsonTexto;
        const JsonConvertido = JSON.parse(jsonTexto);
        const { NomeImagem, X, Y, DiretorioDoProjeto } = JsonConvertido;

        const projetoCriado = await Projeto.create({
            nome_imagem         : NomeImagem,
            diretorio_imagem    : DiretorioDoProjeto,
            largura_imagem      : X,
            altura_imagem       : Y
        });

        const { Pontos } = JsonConvertido;

        Pontos.forEach(async ponto => {
            const { IdPonto, ...pontoSemId } = ponto;

            var novoPonto = await Ponto.create({
                nome_ponto  : pontoSemId.Nome,
                posicao_x   : pontoSemId.X,
                posicao_y   : pontoSemId.Y
            });

            if (Array.isArray(pontoSemId.AnaliseTecnica)) {
                pontoSemId.AnaliseTecnica.forEach(async techobj => {
                    
                    var tecnica = await Tecnica.create();
                    
                    switch(techobj.$type)
                    {
                        case "MO":

                            var tecMo = await Tecnica_MO.create({
                                aumento           : techobj.aumento,
                                data              : techobj.data,
                                comentario        : techobj.comentario,
                                resultado         : techobj.resultado,
                                tonalidade        : techobj.tonalidade,
                                nome_tecnica      : techobj.nomeDaTecnica,
                                TecnicaIdTecnica  : tecnica.id_tecnica    
                            });

                            if(tecMo.id_tecnica_mo != undefined)
                            {
                                if(Array.isArray(techobj.imagensEObjetivas))
                                {
                                    techobj.imagensEObjetivas.forEach(async tecnicaMoImagem => {
                                        var {diretorio, objetiva} = tecnicaMoImagem;

                                        var tecImagemMo = await Tecnica_MO_Imagem.create({
                                            diretorio               : diretorio,
                                            objetiva                : objetiva,
                                            tecnicaMoIdTecnicaMo    : tecMo.id_tecnica_mo
                                        });
                                    });                                
                                }
                            }
                        break;

                        case "FTIR":

                            var tecFtir = await Tecnica_FTIR.create({
                                tempo                   : techobj.tempo,
                                intervalo               : techobj.intervalo,
                                resolucao               : techobj.resolucao,
                                data                    : techobj.data,
                                comentario              : techobj.comentario,
                                resultado               : techobj.resultado,
                                tonalidade              : techobj.tonalidade,
                                nome_tecnica            : techobj.nomeDaTecnica,
                                TecnicaIdTecnica        : tecnica.id_tecnica    
                            });

                            if(tecFtir.id_tecnica_FTIR != undefined){
                                

                                 await Tecnica_FTIR_Diretorio.create({
                                 
                                    diretorio_arquivo           : techobj.diretorio,
                                    TecnicaFTIRIdTecnicaFTIR    : tecFtir.id_tecnica_FTIR
                                })
                            }
                        break;

                        case "XRF":
                            var tecXrf = await Tecnica_XRF.create({
                                tempo                   : techobj.tempo,
                                voltagem                : techobj.tensao,
                                corrente                : techobj.corrente,
                                calibracao              : techobj.calibracao,
                                colimador               : techobj.colimador,
                                data                    : techobj.data,
                                comentario              : techobj.comentario,
                                resultado               : techobj.resultado,
                                tonalidade              : techobj.tonalidade,
                                nome_tecnica            : techobj.nomeDaTecnica,
                                TecnicaIdTecnica        : tecnica.id_tecnica 

                            });

                            if(tecXrf.id_tecnica_xrf != undefined){

                                await Tecnica_XRF_Diretorio.create({

                                    diretorio_arquivo_xrf: techobj.diretorio,
                                    TecnicaXRFIdTecnicaXrf: tecXrf.id_tecnica_xrf    
                                })
                            }



                    }
                    novoPonto.addTecnica(tecnica);
                });
            }
            projetoCriado.addPonto(novoPonto);
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao processar o JSON' });
    }
});





app.get("/", async (req, res) => {
    try {
        const projeto = await Projeto.findAll();
        const ponto = await Ponto.findAll({ include: [{ model: Projeto }] });
        const tecnica = await Tecnica.findAll({ include: [{ model: Ponto }] });
        const tecnicaFtir = await Tecnica_FTIR.findAll({ include: [{ model: Tecnica}] });
        const tecnicaFtirDiretorio = await Tecnica_FTIR_Diretorio.findAll({include: [{model: Tecnica_FTIR}] });





        const tecnicas_MO = await Tecnica_MO.findAll({ include: [{ model: Tecnica }] });
        const tecnicas_MO_Imagem = await Tecnica_MO_Imagem.findAll({ include: [{ model: Tecnica_MO}]})
      

        /*
        correto

        */


        const tecnicaXrf = await Tecnica_XRF.findAll({ include: [{ model: Tecnica}] });
        const tecnicaXrfDiretorio = await Tecnica_XRF_Diretorio.findAll({ include: [{ model: Tecnica_XRF}] });


       res.render("index", { projeto , ponto, tecnica, tecnicaFtir, tecnicaFtirDiretorio,   tecnicaXrf, tecnicaXrfDiretorio});

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao recuperar dados do banco de dados");
    }
});



module.exports = app;