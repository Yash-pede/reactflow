const originalResponse: MockGraphData = {
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
const responseWithMoreNestedChildren: MockGraphData = {
  nodes: [
    {
      function: "cart_router.add_item_to_cart",
      params: ["user_id", "item_id", "db"],
      response_object: "JSONResponse",
      dependent_libs: ["sqlalchemy"],
      children: [
        {
          function: "inventoryy_management.check_inventoryy",
          params: ["product_id", "quantity"],
          response_object: "InventoryStatus",
          dependent_libs: ["sqlalchemy"],
          children: [],
        },
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
              children: [
                {
                  function: "inventory_management.check_inventory",
                  params: ["product_id", "quantity"],
                  response_object: "InventoryStatus",
                  dependent_libs: ["sqlalchemy"],
                  children: [
                    {
                      function: "inventory_managementtt.check_inventortty",
                      params: ["product_id", "quantity"],
                      response_object: "InventoryStatus",
                      dependent_libs: ["sqlalchemy"],
                      children: [],
                    },
                    {
                      function: "inventory_managementt.check_inaventortt",
                      params: ["product_id", "quantity"],
                      response_object: "InventoryStatus",
                      dependent_libs: ["sqlalchemy"],
                      children: [
                        {
                          function:
                            "inventasdaasaasdsory_managementt.casaheck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inveasxasasdantory_managementt.chdcseck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inveytntory_managementt.cheynytck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invtynentory_managementt.chbfgbeck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invefgbfntory_managementt.cheytbck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invenfgbtory_managementt.chefbgck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventofgbfry_managementt.chfgbfeck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invefgbfntory_managementt.chrtgreck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invedgbfntory_managementt.chesfdck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "invdfvfentory_managementt.rrgrcheck_inaventortt",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                      ],
                    },
                    {
                      function: "inventory_managementttt.check_invewntortty",
                      params: ["product_id", "quantity"],
                      response_object: "InventoryStatus",
                      dependent_libs: ["sqlalchemy"],
                      children: [
                        {
                          function:
                            "inventasory_managementttt.check_invasaxewntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventory_managzxementttt.check_invewzx ntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventory_managfbvementttt.check_invnhgewntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventory_mandfvdfagementttt.check_invdfvdewntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventory_managdfvdfvementttt.check_invewntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                        {
                          function:
                            "inventory_managementtdvfdtt.check_invedfvdfwntortty",
                          params: ["product_id", "quantity"],
                          response_object: "InventoryStatus",
                          dependent_libs: ["sqlalchemy"],
                          children: [],
                        },
                      ],
                    },
                    {
                      function: "inventory_managementtttt.check_inventtortt",
                      params: ["product_id", "quantity"],
                      response_object: "InventoryStatus",
                      dependent_libs: ["sqlalchemy"],
                      children: [],
                    },
                  ],
                },
              ],
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
                  function: "ianventory_management.caheck_inventory",
                  params: ["product_id", "quantity"],
                  response_object: "InventoryStatus",
                  dependent_libs: ["sqlalchemy"],
                  children: [],
                },
                {
                  function: "cart_crud.get_freebie_mapping",
                  params: ["product_id", "db"],
                  response_object: "FreebieMapping",
                  dependent_libs: ["sqlalchemy"],
                  children: [
                    {
                      function: "product_discounts.calculate_discount",
                      params: ["product_id", "user_id"],
                      response_object: "DiscountDetails",
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
    },
  ],
};
const responseWithIncreasedComplexity: MockGraphData = {
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
              children: [
                {
                  function: "inventory_management.check_inventory",
                  params: ["product_id", "quantity"],
                  response_object: "InventoryStatus",
                  dependent_libs: ["sqlalchemy"],
                  children: [
                    {
                      function: "notification_service.notify_user",
                      params: ["user_id", "message"],
                      response_object: "Notification",
                      dependent_libs: ["sqlalchemy"],
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              function: "cart_service.apply_discounts",
              params: ["cart_id", "discounts"],
              response_object: "CartItem",
              dependent_libs: ["sqlalchemy"],
              children: [
                {
                  function: "product_discounts.calculate_discount",
                  params: ["product_id", "user_id"],
                  response_object: "DiscountDetails",
                  dependent_libs: ["sqlalchemy"],
                  children: [
                    {
                      function: "user_preferences.get_user_preferences",
                      params: ["user_id"],
                      response_object: "UserPreferences",
                      dependent_libs: ["sqlalchemy"],
                      children: [],
                    },
                  ],
                },
              ],
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
                  children: [
                    {
                      function: "product_discounts.calculate_discount",
                      params: ["product_id", "user_id"],
                      response_object: "DiscountDetails",
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
    },
  ],
};
export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return new Response(JSON.stringify(responseWithIncreasedComplexity), {
    status: 200,
  });
}
  