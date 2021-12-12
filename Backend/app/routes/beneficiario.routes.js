module.exports = app => {
  const beneficiario = require("../controllers/beneficiario.controller");

  var router = require("express").Router();

  //CRUD
  router.post("/", beneficiario.create);
  router.get("/", beneficiario.findAll);
  router.delete("/:rut_beneficiario",beneficiario.delete)
  router.put("/:rut_beneficiario", beneficiario.update);

  //Especificos
  router.get("/consultaespecifica/:numero_autorizacion_giro",beneficiario.ConsultaPorAuth)

  app.use("/api/beneficiario", router);
};
