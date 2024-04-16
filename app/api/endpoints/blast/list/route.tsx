const sampleResponse = [
    {
      entryPoint: "PUT /{asset_id}",
      identifier: "/dir/asset_router.py:asset_put",
    },
    {
      entryPoint: "GET /user/{id}",
      identifier: "/    dir/user_router.py:user_get",
    },
  ] 

export async function GET() {
  return new Response(JSON.stringify(sampleResponse), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
