export async function GET(request: Request) {
  const mock_graph_data: MockGraphData = {
    nodes: [
      {
        function: "cart_router.add_item_to_cart",
        params: ["user_id", "item_id", "db"],
        response_object: "JSONResponse",
        dependent_libs: ["sqlalchemy"],
        children: [
          {
            function: "cart_service.add_item_to_cart",
            params: ["user_id", "item_id", "quantity"],
            response_object: "CartItem",
            dependent_libs: ["sqlalchemy"],
            children: [
              {
                function: "cart_crud.update_inventory",
                params: ["product_id", "quantity"],
                response_object: "None",
                dependent_libs: ["sqlalchemy"],
                children: [],
              },
            ],
          },
          {
            function: "product_client.add_freebie_if_applicable",
            params: ["cart_id", "product_id", "db"],
            response_object: "CartItem",
            dependent_libs: ["sqlalchemy"],
            children: [
              {
                function: "cart_service.add_freebie_if_applicable",
                params: ["cart_id", "product_id", "db"],
                response_object: "None",
                dependent_libs: ["sqlalchemy"],
                children: [
                  {
                    function: "cart_crud.get_freebie_mapping",
                    params: ["product_id", "db"],
                    response_object: "FreebieMapping",
                    dependent_libs: ["sqlalchemy"],
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Response(JSON.stringify(mock_graph_data), {
    status: 200,
  });
}
export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
