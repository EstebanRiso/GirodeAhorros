module.exports = (sequelize, Sequelize) => {
  
    const detalle_pago = sequelize.define("detalle_pago", {
      
      id_detalle_pago: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      numero_cheque:{
        type: Sequelize.INTEGER,
      },
      monto: {
        type: Sequelize.FLOAT,
      },
      rut_constructora: {
        type: Sequelize.INTEGER,
        references:{
            model:'constructora',
            key:'rut_constructora'
        }
      },
      rut_factoring:{
        type: Sequelize.INTEGER,
          references:{
              model: 'factoring',
              key:'rut_factoring'
          }
      },
      numero_autorizacion:{
        type: Sequelize.INTEGER,
        references:{
            model:'autorizacion_pago',
            key:'numero_autorizacion_pago'
        },
      observacion:{
        type: Sequelize.STRING
      },    
      pertenece:{
        type: Sequelize.BOOLEAN
      }
    },
    }, { 
      freezeTableName: true});
  
    return detalle_pago;
  };
  