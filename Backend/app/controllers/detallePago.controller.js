const db = require("../models");
const DetallePago= db.detallepago;
const Op = db.Sequelize.Op;



  
  // CRUD DETALLE PAGO
  exports.create = (req, res) => {
    const detallepago = {
      id_detalle_pago: req.body.id_detalle_pago,
      numero_cheque: req.body.numero_cheque,
      monto: req.body.monto,
      rut_constructora: req.body.rut_constructora,
      rut_factoring: req.body.rut_factoring,
      numero_autorizacion: req.body.numero_autorizacion,
      observacion: req.body.observacion,
      pertenece: req.body.pertenece
    };
    //console.log(prestamo.fecha);
  
  
    DetallePago.create(detallepago) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar DetallePago."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      DetallePago.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar DetallePagos."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const id_detalle_pago = req.params.id_detalle_pago;
  
      DetallePago.update(req.body, {
        where: { id_detalle_pago: id_detalle_pago }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "DetallePago fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar DetallePago con id DetallePago=${id_detalle_pago}. tal vez DetallePago no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar DetallePago con id =" + id_detalle_pago
          });
        });
    };
  
    exports.delete = (req, res) => {
      const id_detalle_pago = req.params.id_detalle_pago;
  
      DetallePago.destroy({
        where: { id_detalle_pago: id_detalle_pago }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "DetallePago fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar DetallePago con id DetallePago=${id_detalle_pago}. tal vez este detalle de pago no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar DetallePago con id DetallePago=" + id_detalle_pago
          });
        });
    }