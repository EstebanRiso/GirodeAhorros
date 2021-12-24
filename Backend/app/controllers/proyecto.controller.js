const db = require("../models");
const Proyecto = db.proyecto;
const Op = db.Sequelize.Op;



  
  // CRUD PROYECTO
  exports.create = (req, res) => {

    const proyecto= {
      id_proyecto: req.body.id_proyecto,
      rut_constructora: req.body.rut_constructora,
      numero_autorizacion: req.body.numero_autorizacion,
      nombre_proyecto: req.body.nombre_proyecto
    };
  
    //console.log(prestamo.fecha);
  
  
    Proyecto.create(proyecto) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al registrar proyecto."
        });
      });
  };
  
  
    exports.findAll = (req, res) => {
  
      Proyecto.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error al listar proyectos."
          });
        });
    };
  
  
    exports.update = (req, res) => {
      const id_proyecto = req.params.id_proyecto;
  
      Proyecto.update(req.body, {
        where: { id_proyecto: id_proyecto }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "proyecto fue actualizado satisfactoriamente."
            });
          } else {
            res.send({
              message: `error al actualizar proyecto con id de proyecto=${id_proyecto}. tal vez proyecto no fue encontrado  o req.body esta vacío!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "error al acutalizar proyecto con id de  proyecto=" + id_proyecto
          });
        });
    };
  
    exports.delete = (req, res) => {
      const id_proyecto = req.params.id_proyecto;
  
      Proyecto.destroy({
        where: { id_proyecto: id_proyecto }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "proyecto fue eliminado satisfactoriamente!"
            });
          } else {
            res.send({
              message: `no se pudo eliminar proyecto con id de proyecto =${id_proyecto}. tal vez este proyecto no fue encontrado!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "no se pudo borrar proyecto con id de proyecto=" + id_proyecto
          });
        });
    }