export const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "Green Park API documentation",
    version: "1.0.0",
    title: "Green Park API documentation",
  },
  host: "localhost:3000",
  tags: [
    {
      name: "Lote",
      description: "Lotes management",
    },
  ],
  paths: {
    "/lote": {
      get: {
        tags: ["lote"],
        summary: "Get existing lotes",
        description: "Get existing lote description",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Lote",
              },
            },
          },
          400: {
            description: "Error occurred",
          },
        },
      },
      post: {
        tags: ["lote"],
        summary: "Create a new lote",
        description: "Create a new lote with the received parameters",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Lote object",
            required: true,
            schema: {
              $ref: "#/definitions/Lote",
            },
          },
        ],
        responses: {
          200: {
            description: "Lote created",
          },
          400: {
            description: "Error occurred",
          },
        },
      },
    },
  },
  definitions: {
    Lote: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 2,
        },
        nome: {
          type: "string",
          example: "Paulo Meirelles",
        },
        ativo: {
          type: "boolean",
          example: true,
        },
        criado_em: {
          type: "timestamp",
          example: "2023-07-12 14:27:30.005",
        },
      },
    },
  },
};
