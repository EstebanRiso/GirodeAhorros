module.exports = (sequelize, Sequelize) => {
  
  const beneficiario = sequelize.define("beneficiario", {
    
    rut_beneficiario: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    dv_beneficiario:{
      type: Sequelize.STRING(1)
    },
    id_banco: {
      type: Sequelize.BIGINT,
      references: {
        model: 'banco', 
        key: 'numero_cuenta'
     }
    },
    numero_autorizacion_pago: {
      type: Sequelize.INTEGER,           // GENERAR ONE TO ONE
      references: {                   
        model: 'autorizacion_pago',            
        key: 'numero_autorizacion_pago'
     }
    },
    nombre_beneficiario: {
      type: Sequelize.STRING
    }
  }, { 
    freezeTableName: true});

  return beneficiario;
};
