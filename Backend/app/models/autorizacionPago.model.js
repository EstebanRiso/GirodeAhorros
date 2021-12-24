module.exports = (sequelize, Sequelize) => {
  
    const autorizacion_pago = sequelize.define("autorizacion_pago", {
      
        numero_autorizacion_pago: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        llamado:{
            type: Sequelize.INTEGER
        },
        linea_subsidio:{
          type: Sequelize.STRING,
        },
        titulo:{
          type: Sequelize.STRING,
        },
        tipo_autorizacion:{
          type:Sequelize.STRING,
       },
        consolidada:{
          type:Sequelize.BOOLEAN
        }
    }, { 
      freezeTableName: true});
  
    return autorizacion_pago;
  };
  