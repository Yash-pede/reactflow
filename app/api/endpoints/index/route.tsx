const sampleResponse = {
  get: {
    summary: "Get Endpoints",
    operationId: "get_endpoints_endpoints_index_get",
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
