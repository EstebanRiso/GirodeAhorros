module.exports = (sequelize, Sequelize) => {
  
    const cert_proyect = sequelize.define("cert_proyect", {
      
        id_proyecto:{
        type: Sequelize.INTEGER,
        references: {
          model: 'certficiado', 
          key: 'id_certificado'
        }
      },
      id_certificado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'proyecto', 
          key: 'id_proyecto'
       }
      },
    }, { 
      freezeTableName: true});
  

    cert_proyect.removeAttribute('id')

    return cert_proyect;
  };
  