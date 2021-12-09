module.exports = (sequelize, Sequelize) => {
    const estado = sequelize.define("estado", {
      nombre_estado: {
        type: Sequelize.STRING
      }
    }, { 
      freezeTableName: true});
  
    return estado;
  };
  