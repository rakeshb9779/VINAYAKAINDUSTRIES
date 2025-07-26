export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";

  let fetchOptions = { method: request.method };
  if (request.method !== "GET" && request.body) {
    fetchOptions.body = request.body;
    fetchOptions.duplex = "half";
  }

  const resp = await fetch(url, fetchOptions);
  const data = await resp.text();

  return new Response(data, {
    status: resp.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
};
