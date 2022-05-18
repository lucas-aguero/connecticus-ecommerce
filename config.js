import dotenv from "dotenv";

console.log("----------------------------------------");
console.log("Working Folder          :", process.cwd());
console.log("Working Enviroment      :", process.env.NODE_ENV);

dotenv.config({
  path: process.cwd() + "/" + process.env.NODE_ENV + ".env",
});

export default {
  PORT: process.env.PORT || 8080,
  TIPO_DE_PERSISTENCIA: process.env.TIPO || "MEM",
  STR_CNX: process.env.CNX || null,
};
