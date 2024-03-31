const configs: ConfigurationType[] = [];

export const GET = () => {
  return new Response(JSON.stringify(configs), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const POST = async (request: Request) => {
  const body = await request.json();
  configs.push(body);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
