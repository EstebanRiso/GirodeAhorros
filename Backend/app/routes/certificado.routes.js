module.exports = app => {
    
    const certificado= require("../controllers/certificado.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", certificado.create);
    router.get("/", certificado.findAll);
    router.delete("/:id_certificado",certificado.delete);  
    router.put("/:id_certificado", certificado.update);
    router.get("/consultaespecifica/1/:numero_autorizacion_pago",certificado.CertificadosByAuthPago)

    app.use("/api/certificado", router);
  };
  