module.exports = app => {
    const desbloqueoestado = require("../controllers/desbloqueoestado.controller");
  
    var router = require("express").Router();
  
    //CRUD
    router.post("/", desbloqueoestado.create);
    router.get("/", desbloqueoestado.findAll);

    /*
    router.delete("/:id",desbloqueoestado.delete)
    router.put("/:id", desbloqueoestado.update);
    */
   
    app.use("/api/desbloqueoestado", router);
  };
  