module.exports = (sequelize, Sequelize) => {
  
    const autorizacion_desbloqueo = sequelize.define("autorizacion_desbloqueo", {
      
        numero_autorizacion_desbloqueo: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        numero_autorizacion_giro:{
            type: Sequelize.INTEGER,
            references: {
                model: 'giroahorro', 
                key: 'numero_autorizacion_giro'
             }
        },
        numero_autorizacion_pago:{
            type: Sequelize.INTEGER,
            references: {
                model: 'autorizacion_pago', 
                key: 'numero_autorizacion_pago'
             }
        },
       /* id_estado:{
            type: Sequelize.INTEGER,
            references:{
                model:'estado',
                key:'id_estado'
            }
        },*/
        antecedentes:{
            type: Sequelize.STRING
        },
        materia:{
            type: Sequelize.STRING
        },
        adjunto:{
            type: Sequelize.STRING
        }
    }, { 
      freezeTableName: true});
  
    return autorizacion_desbloqueo;
  };
  