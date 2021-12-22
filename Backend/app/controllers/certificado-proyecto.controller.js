const db = require("../models");
const Certificado_Proyecto= db.certificado_proyecto;
const Op = db.Sequelize.Op;


//CRUD TABLA UNION CERT- PROYECTO

exports.create = (req, res) => {

  const certificado_proyecto = {
    id_certificado:req.body.id_certificado,
    id_proyecto:req.body.id_proyecto
  };


  Certificado_Proyecto.create(certificado_proyecto) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear tabla union certificado/proyecto."
      });
    });
};


  exports.findAll = (req, res) => {

    Certificado_Proyecto.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar tablas union certificado/proyectos."
        });
      });
  };


  exports.updatebycert = (req, res) => {
    const id_certificado = req.params.id_certificado;

    Certificado_Proyecto.update(req.body, {
      where: { id_certificado: id_certificado }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "certificado/proyecto fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar tabla union certificado/proyecto con id de certificado =${id_certificado}. tal vez el certificado/proyecto no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el Certificado_Proyecto con id de certificado=" + id_certificado
        });
      });
  };

  exports.updatebyproyect = (req, res) => {
    const id_proyecto = req.params.id_proyecto;

    Certificado_Proyecto.update(req.body, {
      where: { id_proyecto: id_proyecto }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "certificado/proyecto fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar tabla union certificado/proyecto con id de proyecto =${id_proyecto}. tal vez el certificado/proyecto no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el Certificado_Proyecto con id de proyecto=" + id_proyecto
        });
      });
  };


  exports.deletebycert = (req, res) => {
    
    const id_certificado = req.params.id_certificado;

    Certificado_Proyecto.destroy({
      where: { id_certificado: id_certificado}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Certificado_Proyecto fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar la tabla union certificado/proyecto con id certificado =${id_certificado}. tal vez esta tabla union certificado/proyecto no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar la tabla union certificado/proyecto con id certificado=" + id_certificado
        });
      });
  };

  exports.deletebyproyect = (req, res) => {
    
    const id_proyecto = req.params.id_proyecto;

    Certificado_Proyecto.destroy({
      where: { id_proyecto: id_proyecto}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Certificado_Proyecto fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el tabla union certificado/proyecto con id =${id_proyecto}. tal vez  esta tabla union certificado/proyecto no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el tabla union certificado/proyecto con id =" + id_proyecto
        });
      });
  };