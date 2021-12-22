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
          key: 'id_estado'
       }
      },
      fecha_actualizacion:{
        type: Sequelize.DATE,
      }
    }, {
      timeStamps:true,
      updatedAt:false,
      createdAt:'estado_generado_el', 
      freezeTableName: true
    });
  


     giroestado.removeAttribute('id')

    return giroestado;
  };
  