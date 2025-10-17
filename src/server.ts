import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import { resolve } from "path";
import cors from "cors";
import os from "os"
import { swaggerDocs } from "./docs";

import path from "path";

const app = express();


//para ajudar o front a testar na mesma rede


function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] as any) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "IP não encontrado";
}
const localIP = getLocalIP();

const port = 3333;
app.use(express.json());
app.use(cors());

app.use("/v1",router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.get("/test", (request: Request, response: Response) => {
  return response.json({ ok: true });
});




app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.get("/terms", (request: Request, response: Response) => {
  response.json({
    message: "Termos de serviço",
  });
});
app.listen(port, () => {
  console.log("Bem vindo a API do FinTrack")
  console.log("Servidor rodando na porta", port);
  console.log("Para utilizar, use a documentação: http://localhost:"+port+"/api-docs")
  console.log(`- Localmente:  http://localhost:${port}`);
  console.log(`- Rede:  http://${localIP}:${port}`);
});
