export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";
  
  const resp = await fetch(url, {
    method: request.method,
    headers: { 'content-type': 'application/json' },
    body: request.body,
    duplex: "half",
  });
  const data = await resp.text();

  return new Response(data, {
    status: resp.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
};
