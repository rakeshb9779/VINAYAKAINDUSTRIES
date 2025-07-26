export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";

  // Prepare options, add body and duplex ONLY for POST/PUT/PATCH etc
  let options = {
    method: request.method,
    headers: { 'content-type': 'application/json' }
  };

  if (request.method !== "GET" && request.body) {
    options.body = request.body;
    options.duplex = "half";
  }

  const resp = await fetch(url, options);
  const data = await resp.text();

  return new Response(data, {
    status: resp.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
};
