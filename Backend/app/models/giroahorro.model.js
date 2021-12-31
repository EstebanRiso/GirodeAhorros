module.exports = (sequelize, Sequelize) => {
  
  const giroahorro = sequelize.define("giroahorro", {
    
    numero_autorizacion_giro: {
      type:Sequelize.INTEGER,
      primaryKey:true 
    },
    id_estado:{
      type:Sequelize.INTEGER,
       references:{
        model: 'estado',
        key: 'id_estado'
       }
    },
    numero_autorizacion_pago:{
      type:Sequelize.INTEGER,
      references: {
        model: 'autorizacion_pago', 
        key: 'numero_autorizacion_pago'
     }
    },
    comuna: {
      type: Sequelize.STRING
    },
    numero_resolucion:{
      type:Sequelize.INTEGER
    },
    fecha_resolucion:{
      type: Sequelize.DATEONLY
    },
    fecha_emision_documento:{
      type: Sequelize.DATEONLY
    }
  }, { 
    freezeTableName: true});

  return giroahorro;
};
