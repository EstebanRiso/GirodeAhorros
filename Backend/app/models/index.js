const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  define:{
    timestamps: false  // le coloco el timestamps false porque no quiero que el ORM en los modelos que yo creo,  
                      // se generen automaticamente un "CREATED AT" y "UPDATED AT" como columnas en las tablas y asi tener un mejor control de lo que uno quiere
                      // si quieren activar solo coloque true en el timestamps pero no lo recomiendo.
  },
  pool: {
    max: dbConfig.pool.max,                       // el pool es mas que nada dar capacidad de cuantas querys puede gestionar la base de datos 
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
db.autorizaciondesbloqueo=require("./autorizacionDesbloqueo.model.js")(sequelize,Sequelize);
db.autorizacionpago=require("./autorizacionPago.model.js")(sequelize,Sequelize);
db.certificado_proyecto=require("./certificado-proyecto.model.js")(sequelize,Sequelize);
db.certificado=require("./certificado.model.js")(sequelize,Sequelize);
db.detallepago=require("./detallePago.model.js")(sequelize,Sequelize);
db.proyecto=require("./proyecto.model.js")(sequelize,Sequelize);
db.factoring=require("./factoring.model.js")(sequelize,Sequelize);


const banco= db.banco
const beneficiario= db.beneficiario;
const constructora= db.constructora;
const estado=  db.estado;
const giroAhorro= db.giroahorro;
const giroEstado=db.giroestado;
const autorizacionDesbloqueo=db.autorizaciondesbloqueo;
const autorizacionPago=db.autorizacionpago;
const certificadoProyecto=db.certificado_proyecto;
const certificado=db.certificado;
const detallePago=db.detallepago;
const proyecto=db.proyecto;
const factoring=db.factoring;




beneficiario.belongsTo(banco,{foreignKey:'id_banco'});


beneficiario.belongsTo(autorizacionPago,{foreignKey:'numero_autorizacion_pago'});



giroAhorro.belongsTo(autorizacionPago,{   foreignKey:{
                                          fieldName:'numero_autorizacion_pago',
                                          unique:true
}});

autorizacionDesbloqueo.belongsTo(autorizacionPago,{   foreignKey:{
                                                      fieldName:'numero_autorizacion_pago', 
                                                      unique:true
}})


autorizacionDesbloqueo.belongsTo(giroAhorro,{  foreignKey:{
                                               fieldName:'numero_autorizacion_giro', 
                                               unique:true
}})

proyecto.belongsTo(constructora,{foreignKey:'rut_constructora'})
proyecto.belongsTo(autorizacionPago,{foreignKey:'numero_autorizacion'})

certificado.belongsTo(beneficiario,{foreignKey:'rut_beneficiario'})

certificadoProyecto.belongsTo(certificado,{foreignKey:'id_certificado'})
certificadoProyecto.belongsTo(proyecto,{foreignKey:'id_proyecto'})

detallePago.belongsTo(factoring,{foreignKey:'rut_factoring'})
detallePago.belongsTo(constructora,{foreignKey:'rut_constructora'})

giroEstado.belongsTo(estado,{foreignKey:'id_estado'});
giroEstado.belongsTo(giroAhorro,{foreignKey:'id_giroahorro'});

//Prestamo.belongsTo(Libro,{foreignKey: 'id_libro_libros'}); 
//Prestamo.belongsTo(Persona,{foreignKey: 'id_persona_personas'}); 


module.exports = db;
