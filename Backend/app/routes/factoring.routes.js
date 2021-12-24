module.exports = app => {
    
    const factoring= require("../controllers/factoring.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", factoring.create);
    router.get("/", factoring.findAll);
    router.delete("/:rut_factoring",factoring.delete);  
    router.put("/:rut_factoring", factoring.update);

    app.use("/api/factoring", router);
  };
  