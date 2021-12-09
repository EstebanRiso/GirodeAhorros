const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  define:{
    timestamps: false  // le coloco el timestamps false porque no quiero que el ORM en los modelos que yo creo,  
                      // se generen automaticamente un "CREATED AT" y "UPDATED AT" como columnas en las tablas y asi tener un mejor control de lo que uno quiere
                      // si quieren activar solo coloque true en el timestamps.
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.banco = require("./banco.model.js")(sequelize, Sequelize);
db.beneficiario = require("./beneficiario.model.js")(sequelize, Sequelize);
db.constructora = require("./constructora.model.js")(sequelize, Sequelize);
db.estado= require("./estado.model.js")(sequelize,Sequelize);
db.giroahorro=require("./giroahorro.model.js")(sequelize,Sequelize);
db.giroestado=require("./giroestado.model.js")(sequelize,Sequelize);


const banco= db.banco
const beneficiario= db.beneficiario;
const constructora= db.constructora;
const estado=  db.estado;
const giroahorro= db.giroahorro;
const giroestado=db.giroestado;




beneficiario.belongsTo(banco,{foreignKey:'id_banco'});


beneficiario.belongsTo(giroahorro,{foreignKey:'numero_autorizacion_giro'});
giroahorro.belongsTo(constructora,{foreignKey:'rut_constructora'});


giroestado.belongsTo(estado,{foreignKey:'id_estado'});
giroestado.belongsTo(giroahorro,{foreignKey:'id_giroahorro'});

//Prestamo.belongsTo(Libro,{foreignKey: 'id_libro_libros'}); 
//Prestamo.belongsTo(Persona,{foreignKey: 'id_persona_personas'}); 


module.exports = db;
