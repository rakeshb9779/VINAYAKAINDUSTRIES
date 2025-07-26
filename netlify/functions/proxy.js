export default async (request, context) => {
  const url = "https://script.google.com/macros/s/AKfycbytvxDO1jlUxa289NXACCuRj0osY4Idep6WXaNC_rJ9WR_6h1pUYfWpBdtsI-AfuGkB/exec";

  let fetchOptions = {
    method: request.method,
    headers: {}
  };

  // Pass along headers for POST requests
  if (request.method !== "GET") {
    // Read body as text (Apps Script expects text not stream)
    const bodyText = await request.text();
    fetchOptions.body = bodyText;
    // Only set content-type if the original request had it
    const contentType = request.headers.get("content-type");
    if (contentType) {
      fetchOptions.headers["content-type"] = contentType;
    }
  }

  try {
    const resp = await fetch(url, fetchOptions);
    const data = await resp.text();

    return new Response(data, {
      status: resp.status,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  } catch (error) {
    // Return the error to debug
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  }
};
