export default async (request, context) => {
  return new Response("Hello from Netlify Function!", {
    status: 200,
    headers: {
      "content-type": "text/plain"
    }
  });
};
