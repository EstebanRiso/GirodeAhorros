module.exports = (sequelize, Sequelize) => {
    const giroestado = sequelize.define("giroestado", {
      id_giroestado:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey:true
      },
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
          key: 'id_estado'
       }
      },
      comentario:{
        type: Sequelize.STRING(500)
      }
    }, {
      timestamps:true,
      updatedAt:false,
      createdAt:'generado_en', 
      freezeTableName: true
    });
  


    

    return giroestado;
  };
  