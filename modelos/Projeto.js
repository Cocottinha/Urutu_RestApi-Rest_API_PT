const Sequelize = require("sequelize");
const connection = require("../database/database");


const Projeto = connection.define('Projeto', {
    id_projeto: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome_imagem: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    diretorio_imagem: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    largura_imagem:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    altura_imagem: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});



module.exports = Projeto;

//Projeto.sync({force: true});
