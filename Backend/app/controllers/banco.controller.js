const db = require("../models");
const Banco = db.banco;
const Op = db.Sequelize.Op;



  
  // CRUD BANCO
  exports.create = (req, res) => {
    const banco = {
      nombre_banco: req.body.nombre_banco,
      numero_cuenta: req.body.numero_cuenta,
      cantidad_ahorro: req.body.cantidad_ahorro,
    };
  
    //console.log(prestamo.fecha);
  
  
    Banco.create(banco) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar banco."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      Banco.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar Bancos."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const id = req.params.id;
  
      Banco.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "banco fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar banco con id=${id}. tal vez banco no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar banco con id=" + id
          });
        });
    };
  
    exports.delete = (req, res) => {
      const id = req.params.id;
  
      Banco.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "banco fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar banco con id=${id}. tal vez esta persona no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar banco con id=" + id
          });
        });
    }