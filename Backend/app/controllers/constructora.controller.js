const db = require("../models");
const Constructora= db.constructora;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const constructora = {
    rut_constructora: req.body.rut_constructora,
    dv_constructora: req.body.dv_constructora,
    nombre_constructora: req.body.nombre_constructora
  };


  Constructora.create(constructora) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear constructora."
      });
    });
};


 exports.findAll = (req, res) => {

    Constructora.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar constructoras."
        });
      });
  };


  exports.update = (req, res) => {
    const rut = req.params.rut_constructora;

    Constructora.update(req.body, {
      where: { rut_constructora: rut }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "constructora fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar constructora con rut=${rut}. tal vez la constructora no fue encontrada o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar constructora con rut=" + rut
        });
      });
  };

  exports.delete = (req, res) => {
    const rut = req.params.rut_constructora;

    Constructora.destroy({
      where: { rut_constructora: rut}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "constructora fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar la constructora con rut=${rut}. tal vez esta constructora no fue encontrada!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar constructora con rut=" + rut
        });
      });
  };
