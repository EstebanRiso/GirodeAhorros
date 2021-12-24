module.exports = app => {
    
    const certificado_proyecto= require("../controllers/certificado-proyecto.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", certificado_proyecto.create);
    router.get("/", certificado_proyecto.findAll);

    /*
    router.delete("/consultaespecifica/1/:id_certificado",certificado_proyecto.deletebycert);  
    router.delete("/consultaespecifica/2/:id_proyecto",certificado_proyecto.deletebyproyect);  
    router.put("/consultaespecifica/3/:id_certificado", certificado_proyecto.updatebycert);
    router.put("/consultaespecifica/4/:id_proyecto", certificado_proyecto.updatebyproyect);
*/
    app.use("/api/certificado_proyecto", router);
  };
  