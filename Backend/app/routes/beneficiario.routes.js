module.exports = app => {
  const beneficiario = require("../controllers/beneficiario.controller");

  var router = require("express").Router();

  
  router.post("/", beneficiario.create);
  router.get("/", beneficiario.findAll);
  router.delete("/:rut_beneficiario",beneficiario.delete)
  router.put("/:rut_beneficiario", beneficiario.update);
  
  app.use("/api/beneficiario", router);
};
