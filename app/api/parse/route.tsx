const sampleResponse = {
  get: {
    summary: "Parse Directory",
    operationId: "parse_directory_parse_get",
    responses: {
      "200": {
        description: "Successful Response",
        content: {
          "application/json": {
            schema: {},
          },
        },
      },
    },
  },
};

export async function GET() {
  return new Response(JSON.stringify(sampleResponse));
}
