const { beneficiario } = require("../models");
const db = require("../models");
const Beneficiario = db.beneficiario;
const Banco= db.banco
const Op = db.Sequelize.Op;

exports.create = (req, res) => {


  const beneficiario = {
    rut_beneficiario: req.body.rut_beneficiario,
    dv_beneficiario: req.body.dv_beneficiario,
    id_banco : req.body.id_banco,
    numero_autorizacion_pago: req.body.numero_autorizacion_pago,
    nombre_beneficiario: req.body.nombre_beneficiario
  };


// CRUD BENEFICIARIO


// Crear Beneficiario
  Beneficiario.create(beneficiario) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al registrar beneficiario."
      });
    });
};

// Listar todos los beneficiarios
  exports.findAll = (req, res) => {
    console.log("PASO EN EL FINDALL")
    Beneficiario.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al encontrar beneficiarios."
        });
      });
  };


 // Actualizar Beneficiario
  exports.update = (req, res) => {
    const rut = req.params.rut_beneficiario;

    Beneficiario.update(req.body, {
      where: { rut_beneficiario: rut }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "beneficiario fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar beneficiario con rut=${rut}. tal vez persona no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar beneficiario con rut=" + rut
        });
      });
  };

  // Eliminar Beneficario
  exports.delete = (req, res) => {
    const rut = req.params.rut_beneficiario;

    Beneficiario.destroy({
      where: { rut_beneficiario: rut }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "beneficiario fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar beneficiario con rut=${rut}. tal vez esta persona no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar beneficiario con rut=" + rut
        });
      });
  }

 // Consultas Especificas
 
  exports.ConsultaPorAuth= (req,res)=>{
    const autorizacion=req.params.numero_autorizacion_pago
   try {
    Beneficiario.findAll({where:{numero_autorizacion_pago:autorizacion},
      include:[{
        model:Banco,
        attributes:["nombre_banco","numero_cuenta","certificado","cantidad_ahorro"]
      }]
    })
    .then((data)=>{
      res.send(data);
    }).catch((error)=>{
      res.status(500).send({
        message:
          err.message || "Error al encontrar beneficiarios."
      });
    })
   } catch (error) {
    res.status(500).send(error);
   }
    
  
  }
  
  