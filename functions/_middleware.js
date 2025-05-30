export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Fetch the original response from the underlying asset or the next function in the chain
  const originalResponse = await next();

  // Only proceed if the response is HTML
  if (!originalResponse.headers.get("content-type")?.includes("text/html")) {
    return originalResponse; // Not HTML, so pass through untouched
  }

  // Check for dynamic OG parameters
  const bgParam = url.searchParams.get('bg');
  const fgParam = url.searchParams.get('fg');
  const isGetRequest = request.method === 'GET';

  if (isGetRequest && bgParam && fgParam) {
    // --- TEST BLOCK ENTRY --- 
    // If this block is truly entered, return a very simple, unique HTML page.
    // This bypasses all other logic to confirm entry into this specific conditional.
    const testHtml = `
      <!DOCTYPE html>
      <html><head><title>DYNAMIC BLOCK ENTERED</title></head>
      <body><h1>DYNAMIC if (isGetRequest && bgParam && fgParam) WAS TRUE</h1>
      <p>Request Method: ${request.method}</p>
      <p>bgParam: ${bgParam}</p>
      <p>fgParam: ${fgParam}</p>
      <p>URL: ${url.toString()}</p>
      </body></html>`;
    return new Response(testHtml, { headers: { 'Content-Type': 'text/html' } });
    // --- END TEST BLOCK ENTRY ---

    // Original dynamic logic (currently bypassed by the test return above)
    // let tagsToInject = [];
    // let shouldRewrite = true; 
    // ... (rest of the dynamic tag preparation and MetaTagManager would go here)
    // if (shouldRewrite) { ... HTMLRewriter ... }

  } else {
    // This means the condition (isGetRequest && bgParam && fgParam) was FALSE.
    // Serve the original HTML with its static tags.
    // Add a comment to confirm this path was taken.
    class StaticPathComment {
        element(el) { el.append("<!-- SERVING STATIC: Dynamic conditions NOT met -->", {html: true}); }
    }
    return new HTMLRewriter().on("head", new StaticPathComment()).transform(originalResponse);
  }

  // Fallback, should not be reached if the logic above is sound.
  // If it is, it means neither dynamic nor static path was decisively chosen.
  class FallbackComment {
      element(el) { el.append("<!-- UNEXPECTED FALLTHROUGH -->", {html: true}); }
  }
  return new HTMLRewriter().on("head", new FallbackComment()).transform(originalResponse);
} 