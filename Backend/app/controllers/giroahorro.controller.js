const { constructora } = require("../models");
const db = require("../models");
const Giroahorro= db.giroahorro;
const Autorizacionpago=db.autorizacionpago
const Estado=db.estado
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const giroahorro = {
    numero_autorizacion_giro: req.body.numero_autorizacion_giro,
    numero_autorizacion_pago:req.body.numero_autorizacion_pago,
    id_estado: req.body.id_estado,
    comuna: req.body.comuna,
    numero_resolucion: req.body.numero_resolucion,
    fecha_resolucion: req.body.fecha_resolucion,
    fecha_emision_documento: req.body.fecha_emision_documento
  };


  Giroahorro.create(giroahorro) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear giro de ahorro."
      });
    });
};


  exports.findAll = (req, res) => {

    Giroahorro.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar giro de ahorros."
        });
      });
  };


  exports.update = (req, res) => {
    const numero = req.params.numero_autorizacion_giro;

    Giroahorro.update(req.body, {
      where: { numero_autorizacion_giro: numero }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giro de ahorro fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar giro de ahorro con numero autorizacion de giro=${numero}. tal vez el giro no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar el giro de ahorro con numero de autorizacion=" + numero
        });
      });
  };

  exports.delete = (req, res) => {
    const numero = req.params.numero_autorizacion_giro;

    Giroahorro.destroy({
      where: { numero_autorizacion_giro: numero }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "giro de ahorro fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar el giro de ahorro con numero de autorizacion de giro=${numero}. tal vez este giro no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar el giro de ahorro con numero de autorizacion=" + numero
        });
      });
  };

  exports.ConsultaPorAuth= (req,res)=>{

    const autorizacion=req.params.numero_autorizacion_giro

    Giroahorro.findOne({where:{numero_autorizacion_giro:autorizacion},
      include:[{
        model:Autorizacionpago,
        attributes:["numero_autorizacion_pago","llamado","linea_subsidio","titulo","consolidada"]
      },{
        model:Estado,
        attributes:["id_estado","nombre_estado"]
      }]
    })
    .then((data)=>{
      res.send(data);
    }).catch((error)=>{
      res.status(500).send({
        message:
          err.message || "Error al encontrar giro de ahorro."
      });
    })
  
  }


/*
  exports.ConsultaPorRutConstr= (req,res)=>{

    const rut_constructora=req.params.rut_constructora

    Giroahorro.findAll({where:{rut_constructora:rut_constructora},
        include:[{
          model:Constructora,
          attributes:["rut_constructora","dv_constructora","nombre_constructora"]
      }]
    })
    .then((data)=>{
      res.send(data);
    }).catch((error)=>{
      res.status(500).send({
        message:
          err.message || "Error al encontrar giros de ahorro."
      });
    })
  
  } */
