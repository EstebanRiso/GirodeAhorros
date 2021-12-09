module.exports = (sequelize, Sequelize) => {
    const giroestado = sequelize.define("giroestado", {
      id_giroahorro: {
        type: Sequelize.INTEGER,
        references: {
          model: 'giroahorro', 
          key: 'numero_autorizacion_giro'
       }
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estado', 
          key: 'id'
       }
      }
    }, { 
      freezeTableName: true});
  
    return giroestado;
  };
  