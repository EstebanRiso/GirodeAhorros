const db = require("../models");
const Estado= db.estado;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const estado = {
    nombre_estado:req.body.nombre_estado
  };


  Estado.create(estado) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear estado."
      });
    });
};


  exports.findAll = (req, res) => {

    Estado.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar estados."
        });
      });
  };


  exports.update = (req, res) => {
    const id = req.params.id;

    Estado.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "estado fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar estado con id =${id}. tal vez el estado no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el estado con id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    Estado.destroy({
      where: { id : id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "estado fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el estado con id =${id}. tal vez este estado no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el estado con id =" + id
        });
      });
  };
