module.exports = app => {
    
    const certificado= require("../controllers/certificado.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", certificado.create);
    router.get("/", certificado.findAll);
    router.delete("/:id_certificado",certificado.delete);  
    router.put("/:id_certificado", certificado.update);

    app.use("/api/certificado", router);
  };
  