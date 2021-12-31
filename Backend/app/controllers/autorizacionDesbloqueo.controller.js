const db = require("../models");
const AutorizacionDesbloqueo = db.autorizaciondesbloqueo;
const Op = db.Sequelize.Op;
const Autorizacionpago=db.autorizacionpago
const Estado=db.desbloqueoestado
const AutorizacionGiro=db.giroahorro


  
  // CRUD AUTORIZACION DESBLOQUEO
  exports.create = (req, res) => {
    const autorizaciondesbloqueo = {
      numero_autorizacion_desbloqueo: req.body.numero_autorizacion_desbloqueo,
      numero_autorizacion_giro: req.body.numero_autorizacion_giro,
      numero_autorizacion_pago: req.body.numero_autorizacion_pago,
      antecedentes: req.body.antecedentes,
      materia: req.body.materia,
      adjunto: req.body.adjunto
    };
  
    //console.log(prestamo.fecha);
  
  
    AutorizacionDesbloqueo.create(autorizaciondesbloqueo) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar AutorizacionDesbloqueo."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      AutorizacionDesbloqueo.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar AutorizacionDesbloqueos."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const numero_autorizacion_desbloqueo  = req.params.numero_autorizacion_desbloqueo ;
  
      AutorizacionDesbloqueo.update(req.body, {
        where: { numero_autorizacion_desbloqueo : numero_autorizacion_desbloqueo  }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "AutorizacionDesbloqueo fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar AutorizacionDesbloqueo con numero autorizacion desbloqueo =${numero_autorizacion_desbloqueo }. tal vez AutorizacionDesbloqueo no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar AutorizacionDesbloqueo con numero autorizacion desbloqueo =" + numero_autorizacion_desbloqueo 
          });
        });
    };
  
    exports.delete = (req, res) => {
      const numero_autorizacion_desbloqueo  = req.params.numero_autorizacion_desbloqueo ;
  
      AutorizacionDesbloqueo.destroy({
        where: { numero_autorizacion_desbloqueo : numero_autorizacion_desbloqueo  }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "AutorizacionDesbloqueo fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar AutorizacionDesbloqueo con numero autorizacion desbloqueo =${numero_autorizacion_desbloqueo }. tal vez esta autorizacion de desbloqueo no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar AutorizacionDesbloqueo con numero autorizacion desbloqueo =" + numero_autorizacion_desbloqueo 
          });
        });
    }

    exports.ConsultaPorAuth= (req,res)=>{
    
      const autorizacion=req.params.numero_autorizacion_giro
      
      AutorizacionDesbloqueo.findOne({where:{numero_autorizacion_giro:autorizacion},
        include:[{
          model:Autorizacionpago,
          attributes:["numero_autorizacion_pago","llamado","linea_subsidio","titulo","consolidada"]
        },/*{
          model:Estado,
          attributes:["id_estado","nombre_estado"]
        },*/{
          model:AutorizacionGiro,
          attributes:["id_estado","comuna","numero_resolucion","fecha_resolucion","fecha_emision_documento"]
        }]
      })
      .then((data)=>{
        res.send(data);
      }).catch((error)=>{
        res.status(500).send({
          message:
            error.message || "Error al encontrar giro de ahorro."
        });
      })
    
    }