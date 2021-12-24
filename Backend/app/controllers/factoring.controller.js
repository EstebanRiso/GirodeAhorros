const db = require("../models");
const Factoring = db.factoring;
const Op = db.Sequelize.Op;



  
  // CRUD FACTORING
  exports.create = (req, res) => {
    const factoring = {
      rut_factoring: req.body.rut_factoring,
      dv_factoring: req.body.dv_factoring,
      nombre_factoring: req.body.nombre_factoring,
    };
  
    //console.log(prestamo.fecha);
  
  
    Factoring.create(factoring) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar factoring."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      Factoring.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar factorings."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const rut_factoring = req.params.rut_factoring;
  
      Factoring.update(req.body, {
        where: { rut_factoring: rut_factoring }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Factoring fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar factoring con rut del factoring=${rut_factoring}. tal vez el factoring no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar factoring con rut=" + rut_factoring
          });
        });
    };
  
    exports.delete = (req, res) => {
      const rut_factoring = req.params.rut_factoring;
  
      Factoring.destroy({
        where: { rut_factoring: rut_factoring }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Factoring fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar factoring con rut del factoring=${rut_factoring}. tal vez este factoring no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar factoring con rut_factoring=" + rut_factoring
          });
        });
    }