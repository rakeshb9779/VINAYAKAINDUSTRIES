export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";
  
  // Forward the request (method, headers, body)
  const resp = await fetch(url, {
    method: request.method,
    headers: { 'content-type': 'application/json' },
    body: request.body,
  });
  const data = await resp.text();

  // Use the Response class
  return new Response(data, {
    status: resp.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
};
