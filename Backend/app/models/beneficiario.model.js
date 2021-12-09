module.exports = (sequelize, Sequelize) => {
  
  const beneficiario = sequelize.define("beneficiario", {
    
    rut_beneficiario: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    dv_beneficiario:{
      type: Sequelize.STRING
    },
    id_banco: {
      type: Sequelize.INTEGER,
      references: {
        model: 'banco', 
        key: 'id'
     }
    },
    numero_autorizacion_giro: {
      type: Sequelize.INTEGER,
      references: {
        model: 'giroahorro', 
        key: 'numero_autorizacion_giro'
     }
    },
    nombre_beneficiario: {
      type: Sequelize.STRING
    }
  }, { 
    freezeTableName: true});

  return beneficiario;
};
