import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import { resolve } from "path";
import cors from "cors";
import { swaggerDocs } from "./docs";


const app = express();

const port = 3333;
app.use(express.json());
app.use(cors());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/files", express.static(resolve(__dirname, "..", "uploads")));

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
  console.log("Servidor rodando na porta", port);
  console.log("Para utilizar, use a documentação: http://localhost:"+port+"/api-docs")
});
