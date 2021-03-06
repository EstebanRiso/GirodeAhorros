module.exports = (sequelize, Sequelize) => {
  
    const certificado = sequelize.define("certificado", {
      
      id_certificado: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      rut_beneficiario:{
        type: Sequelize.INTEGER,
        references:{
            model: 'beneficiario',
            key:'rut_beneficiario'
        }
      },
      id_proyecto:{
        type: Sequelize.INTEGER,
        references:{
          model: 'proyecto',
          key: 'id_proyecto'
        }
      },
      certificado_nombre: {
        type: Sequelize.STRING,
      },
      certificado_anio: {
        type: Sequelize.INTEGER,
      }
    }, { 
      freezeTableName: true});
  
    return certificado;
  };
  