module.exports = {
  
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "credecialidad08",
  DB: "BDD_Giro_Ahorro",
  dialect: "postgres",
  pool: 
  {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

};
