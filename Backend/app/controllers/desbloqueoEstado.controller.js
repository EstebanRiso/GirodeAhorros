const { desbloqueoestado } = require("../models");
const db = require("../models");
const Desbloqueoestado= db.desbloqueoestado;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const desbloqueoestado = {
    id_desbloqueo:req.body.id_desbloqueo,
    id_estado:req.body.id_estado,
    comentario:req.body.comentario
  };


  Desbloqueoestado.create(desbloqueoestado) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear tabla unión desbloqueo-estado."
      });
    });
};


  exports.findAll = (req, res) => {

    Desbloqueoestado.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar estados en la tabla unión desbloqueo-estado."
        });
      });
  };

/*
  exports.updatebyahorro = (req, res) => {
    const id_giroahorro = req.params.id_giroahorro;

    Desbloqueoestado.update(req.body, {
      where: { id_giroahorro: id_giroahorro }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Desbloqueoestado fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar Desbloqueoestado con id de giro de ahorro =${id_giroahorro}. tal vez el Desbloqueoestado no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el Desbloqueoestado con id=" + id_giroahorro
        });
      });
  };

  exports.updatebyestado = (req, res) => {
    const id_estado = req.params.id_estado;

    Desbloqueoestado.update(req.body, {
      where: { id_estado: id_estado}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Desbloqueoestado fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar Desbloqueoestado con id =${id}. tal vez el Desbloqueoestado no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el Desbloqueoestado con id=" + id
        });
      });
  };

  exports.deletebyahorro = (req, res) => {
    const id_giroahorro = req.params.id_giroahorro;

    Desbloqueoestado.destroy({
      where: { id_giroahorro: id_giroahorro }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Desbloqueoestado fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el Desbloqueoestado con id =${id_giroahorro}. tal vez este Desbloqueoestado no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el Desbloqueoestado con id =" + id_giroahorro
        });
      });
  };

  exports.deletebyestado = (req, res) => {
    const id = req.params.id;

    Desbloqueoestado.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Desbloqueoestado fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el Desbloqueoestado con id =${id}. tal vez este Desbloqueoestado no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el Desbloqueoestado con id =" + id
        });
      });
  };*/