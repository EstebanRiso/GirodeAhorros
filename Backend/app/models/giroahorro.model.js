module.exports = (sequelize, Sequelize) => {
  
    const giroahorro = sequelize.define("giroahorro", {
      
      numero_autorizacion_giro: {
        type:Sequelize.INTEGER,
        primaryKey:true 
      },
      rut_constructora: {
        type: Sequelize.INTEGER,
        references: {
          model: 'constructora', 
          key: 'rut_constructora'
       }
      },
      comuna: {
        type: Sequelize.STRING
      },
      llamado: {
          type:Sequelize.INTEGER
      },
      resolucion:{
        type: Sequelize.STRING
      },
      nombre_proyecto: {
        type: Sequelize.STRING
      },
      fecha_emision:{
        type: Sequelize.DATEONLY
      }

    }, { 
      freezeTableName: true});
  
    return giroahorro;
  };
  