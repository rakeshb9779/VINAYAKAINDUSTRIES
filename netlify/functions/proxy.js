export default async (event, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";
  
  const resp = await fetch(url, {
    method: event.httpMethod,
    headers: { 'Content-Type': 'application/json' },
    body: event.body,
  });
  const data = await resp.text();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: data,
  };
};
