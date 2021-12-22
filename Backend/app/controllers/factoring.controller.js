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
  
  
    Certificado.create(certificado) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar certificado."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      Certificado.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar certificados."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const id_certificado = req.params.id_certificado;
  
      Certificado.update(req.body, {
        where: { id_certificado: id_certificado }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "certificado fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar Certificado con id certificado=${id_certificado}. tal vez certificado no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar Certificado con id certificado=" + id_certificado
          });
        });
    };
  
    exports.delete = (req, res) => {
      const id_certificado = req.params.id_certificado;
  
      Certificado.destroy({
        where: { id_certificado: id_certificado }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Certificado fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar Certificado con id certificado=${id_certificado}. tal vez esta persona no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar Certificado con id certificado=" + id_certificado
          });
        });
    }