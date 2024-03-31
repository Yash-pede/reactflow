export async function GET(request: Request) {
  const Dependency = [
    {
      name: "carts",
      dependencies: [
        {
          name: "SQLAlchemy",
          version: "1.4.31",
          description: "SQL toolkit and Object-Relational Mapping for Python",
        },
        {
          name: "Flask",
          version: "2.0.1",
          description: "Micro web framework for Python",
        },
        {
          name: "requests",
          version: "2.26.0",
          description: "Python HTTP library",
        },
        {
          name: "httpx",
          version: "0.19.0",
          description: "HTTP client for Python",
        },
      ],
    },
    {
      name: "product",
      dependencies: [
        {
          name: "Django",
          version: "3.2.7",
          description: "High-level Python web framework",
        },
        {
          name: "Pillow",
          version: "8.3.1",
          description: "Python Imaging Library (PIL)",
        },
      ],
    },
    {
      name: "order",
      dependencies: [
        {
          name: "Express",
          version: "4.17.1",
          description:
            "Fast, unopinionated, minimalist web framework for Node.js",
        },
        {
          name: "MongoDB",
          version: "4.4.9",
          description: "NoSQL database",
        },
      ],
    },
  ];

  const { searchParams } = new URL(request.url);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return new Response(
    JSON.stringify(
      Dependency.find((d) => (d.name === searchParams.get("flow")))
    ),
    {
      status: 200,
    }
  );
}
