module.exports = (sequelize, Sequelize) => {
    const estado = sequelize.define("estado", {
      
    id_estado:{
      type:Sequelize.INTEGER,
      PrimaryKey:true
    },
      nombre_estado: {
        type: Sequelize.STRING
      },
      comentario:{
        type: Sequelize.STRING
      }
    }, { 
      freezeTableName: true});
  
    return estado;
  };
  