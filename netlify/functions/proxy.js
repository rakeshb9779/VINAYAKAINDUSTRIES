export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";

  // Copy the method, headers, and body for POST/PUT requests
  const fetchOptions = {
    method: request.method,
    headers: {
      "content-type": request.headers.get("content-type") || "application/json"
    }
  };
  if (request.method !== "GET" && request.body) {
    fetchOptions.body = request.body;
  }

  // Make the request to Google Apps Script
  const resp = await fetch(url, fetchOptions);

  // Get response body as text
  const data = await resp.text();

  return new Response(data, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    }
  });
};
