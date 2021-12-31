module.exports = (sequelize, Sequelize) => {
    const desbloqueoestado = sequelize.define("desbloqueoestado", {
      id_desbloqueoestado:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey:true
      }
      ,
      id_desbloqueo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'autorizacion_desbloqueo', 
          key: 'numero_autorizacion_desbloqueo'
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
  


     desbloqueoestado.removeAttribute('id')

    return desbloqueoestado;
  };
  