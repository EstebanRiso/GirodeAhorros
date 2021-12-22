const db = require("../models");
const AutorizacionPago = db.autorizacionpago;
const Op = db.Sequelize.Op;



  
  // CRUD Autorizacion Pago
  exports.create = (req, res) => {
    const autorizacionpago = {
      numero_autorizacion_pago: req.body.numero_autorizacion_pago,
      llamado: req.body.llamado,
      linea_subsidio: req.body.linea_subsidio,
      titulo: req.body.titulo,
    };
  
    //console.log(prestamo.fecha);
  
  
    AutorizacionPago.create(autorizacionpago) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar autorizacion de pago."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      AutorizacionPago.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar autorizaciones de pago."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const numero_autorizacion_pago = req.params.numero_autorizacion_pago;
  
      AutorizacionPago.update(req.body, {
        where: { numero_autorizacion_pago: numero_autorizacion_pago }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "AutorizacionPago fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar autorizacion de pago con numero autorizacion de pago =${numero_autorizacion_pago}. tal vez la autorizacion de pago no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar autorizacion de pago con numero autorizacion de pago =" + numero_autorizacion_pago
          });
        });
    };
  
    exports.delete = (req, res) => {
      const numero_autorizacion_pago = req.params.numero_autorizacion_pago;
  
      AutorizacionPago.destroy({
        where: { numero_autorizacion_pago: numero_autorizacion_pago }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "AutorizacionPago fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar autorizacion de pago con numero autorizacion pago=${numero_autorizacion_pago}. tal vez esta persona no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar autorizacion de pago con numero autorizacion pago=" + numero_autorizacion_pago
          });
        });
    }