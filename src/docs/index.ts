import userDocs from "./user.json";

export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API FinTrack",
    description: "API para controle de finanças pessoais, com despesas, receitas, relatórios mensais e autenticação JWT. É utilizada no aplicativo FinTrack.",
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
  },
  components: {
    schemas: {
      ...userDocs.components?.schemas,
    }
  }
};
