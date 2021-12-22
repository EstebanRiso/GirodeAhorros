module.exports = (sequelize, Sequelize) => {
    const factoring= sequelize.define("factoring", {
  
      rut_factoring: {
        type: Sequelize.INTEGER,
        primaryKey:true
      },
      dv_factoring: {
        type: Sequelize.STRING(1),
      },
      nombre_factoring: {
        type: Sequelize.STRING
      },
    },
    { 
      freezeTableName: true});

    return factoring;
  };