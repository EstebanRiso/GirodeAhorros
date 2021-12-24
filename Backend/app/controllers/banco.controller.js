const db = require("../models");
const Banco = db.banco;
const Op = db.Sequelize.Op;



  
  // CRUD BANCO
  exports.create = (req, res) => {
    const banco = {
      numero_cuenta: req.body.numero_cuenta,
      nombre_banco: req.body.nombre_banco,
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
      const numero_cuenta = req.params.numero_cuenta;
  
      Banco.update(req.body, {
        where: { numero_cuenta: numero_cuenta }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "banco fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar banco con numero_cuenta=${numero_cuenta}. tal vez banco no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar banco con numero_cuenta=" + numero_cuenta
          });
        });
    };
  
    exports.delete = (req, res) => {
      const numero_cuenta = req.params.numero_cuenta;
  
      Banco.destroy({
        where: { numero_cuenta: numero_cuenta }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "banco fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar banco con numero_cuenta=${numero_cuenta}. tal vez este banco no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar banco con numero_cuenta=" + numero_cuenta
          });
        });
    }