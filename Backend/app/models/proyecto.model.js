module.exports = (sequelize, Sequelize) => {
  
    const proyecto = sequelize.define("proyecto", {
      
     id_proyecto: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
        rut_constructora:{
        type: Sequelize.INTEGER,
        references: {
          model: 'constructora', 
          key: 'rut_constructora'
        }
      },
      numero_autorizacion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'autorizacion_pago', 
          key: 'numero_autorizacion_pago'
       }
      },
       nombre_proyecto: {
        type: Sequelize.STRING,
      },
    }, { 
      freezeTableName: true});
  
    return proyecto;
  };
  