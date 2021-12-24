const db = require("../models");
const Giroestado= db.giroestado;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const giroestado = {
    id_giroahorro:req.body.id_giroahorro,
    id_estado:req.body.id_estado
  };


  Giroestado.create(giroestado) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear giroestado."
      });
    });
};


  exports.findAll = (req, res) => {

    Giroestado.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar giroestados."
        });
      });
  };

/*
  exports.updatebyahorro = (req, res) => {
    const id_giroahorro = req.params.id_giroahorro;

    Giroestado.update(req.body, {
      where: { id_giroahorro: id_giroahorro }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giroestado fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar giroestado con id de giro de ahorro =${id_giroahorro}. tal vez el giroestado no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el giroestado con id=" + id_giroahorro
        });
      });
  };

  exports.updatebyestado = (req, res) => {
    const id_estado = req.params.id_estado;

    Giroestado.update(req.body, {
      where: { id_estado: id_estado}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giroestado fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar giroestado con id =${id}. tal vez el giroestado no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el giroestado con id=" + id
        });
      });
  };

  exports.deletebyahorro = (req, res) => {
    const id_giroahorro = req.params.id_giroahorro;

    Giroestado.destroy({
      where: { id_giroahorro: id_giroahorro }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giroestado fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el giroestado con id =${id_giroahorro}. tal vez este giroestado no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el giroestado con id =" + id_giroahorro
        });
      });
  };

  exports.deletebyestado = (req, res) => {
    const id = req.params.id;

    Giroestado.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giroestado fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el giroestado con id =${id}. tal vez este giroestado no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el giroestado con id =" + id
        });
      });
  };*/