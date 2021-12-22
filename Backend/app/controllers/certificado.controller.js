const db = require("../models");
const Certificado = db.certificado;
const Op = db.Sequelize.Op;



  
  // CRUD CERTIFICADO 
  exports.create = (req, res) => {
    const certificado = {
      id_certificado: req.body.id_certificado,
      rut_beneficiario: req.body.rut_beneficiario,
      certificado_nombre: req.body.certificado_nombre,
      certificado_anio: req.body.certificado_anio
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