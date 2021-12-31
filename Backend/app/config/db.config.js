module.exports = {
  
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "credecialidad08",
  DB: "BDD_Giro_Ahorro",
  dialect: "postgres",
  pool: 
  {
    max: 5,   // MAXIMOS QUERYS
    min: 0,   // MINIMOS QUERYS
    acquire: 30000,
    idle: 10000
  }

};
