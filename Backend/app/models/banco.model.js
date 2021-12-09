module.exports = (sequelize, Sequelize) => {
    const banco = sequelize.define("banco", {
      nombre_banco: {
        type: Sequelize.STRING
      },
      numero_cuenta: {
        type: Sequelize.BIGINT
      },
      cantidad_ahorro: {
        type: Sequelize.FLOAT
      }
    }, { 
      freezeTableName: true});
  
    return banco;
  };
  