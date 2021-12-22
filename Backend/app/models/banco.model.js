module.exports = (sequelize, Sequelize) => {
    const banco = sequelize.define("banco", {
      numero_cuenta: {
        type: Sequelize.BIGINT,
        primaryKey:true
      },
      nombre_banco: {
        type: Sequelize.STRING
      },
      cantidad_ahorro: {
        type: Sequelize.FLOAT
      }
    }, { 
      freezeTableName: true});
  
    return banco;
  };
  