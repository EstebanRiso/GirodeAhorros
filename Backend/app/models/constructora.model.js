module.exports = (sequelize, Sequelize) => {
    const constructora= sequelize.define("constructora", {
  
      rut_constructora: {
        type: Sequelize.INTEGER,
        primaryKey:true
      },
      dv_constructora: {
        type: Sequelize.STRING,
      },
      nombre_constructora: {
        type: Sequelize.STRING
      },
    },
    { 
      freezeTableName: true});

    return constructora;
  };