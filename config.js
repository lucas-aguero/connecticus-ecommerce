import dotenv from "dotenv";

console.log("Working Folder    :", process.cwd()); // Mostrar la Carpeta de trabajo
console.log("Working Enviroment:", process.env.NODE_ENV); // Mostrar tipo de entorno de trabajo

// Leer el archivo de configuracion segun el
// entorno de trabajo establecido al ejecutar el server
dotenv.config({
  path: process.cwd() + "/" + process.env.NODE_ENV + ".env",
});

export default {
  PORT: process.env.PORT || 8080,
  TIPO_DE_PERSISTENCIA: process.env.TIPO || "MEM",
  STR_CNX: process.env.CNX || null,
};
