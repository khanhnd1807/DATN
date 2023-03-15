import { Express, Response, Request } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const { NODE_SERVER = "http://be.wsm.zinza.com" } = process.env;
const option: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Wsm clone",
      version: "v1.0.0",
      description: "api wsm clone",
    },
    servers: [
      {
        url: `${NODE_SERVER}`,
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer ",
        in: "header",
      },
    },
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
  },
  apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(option);

function swaggerDocs(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.header("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`docs available`);
}

export default swaggerDocs;
