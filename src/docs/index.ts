import userDocs from "./user.json";
import otherRoutesDocs from "./other-routes.json"
import categoriesDocs from "./categories.json"
import transactionDocs from "./transactions.json"
export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API FinTrack",
    description: "API para controle de finanças pessoais, com despesas, receitas, relatórios mensais e autenticação JWT. É utilizada no aplicativo FinTrack. Mande as sempre datas em UTC.",
    version: "1.0.0"
  },
  servers: [
    {
      url: "/v1",
      description: "API v1"
    }
  ],
  paths: {
    ...userDocs.paths,
    ...categoriesDocs.paths,
    ...transactionDocs.paths,
    ...otherRoutesDocs.paths
  },
  components: {
    schemas: {
      ...userDocs.components?.schemas,
      ...categoriesDocs.components?.schemas,
      ...transactionDocs.components?.schemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    
  },
  
  
};
