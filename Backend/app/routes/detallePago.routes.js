module.exports = app => {
    
    const detallepago= require("../controllers/detallePago.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", detallepago.create);
    router.get("/", detallepago.findAll);
    router.delete("/:id_detalle_pago",detallepago.delete);  
    router.put("/:id_detalle_pago", detallepago.update);

    app.use("/api/detallepago", router);
  };
  