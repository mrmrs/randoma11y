export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Define params early for debugging
  const bgParamForDebug = url.searchParams.get('bg');
  const fgParamForDebug = url.searchParams.get('fg');

  // Fetch the original page asset first. This is important.
  let response = await next();
  let originalContentType = response.headers.get("content-type") || 'null';

  // First rewriter for basic debugging info
  if (originalContentType.includes("text/html")) {
    class HeadDebugInjector {
      element(element) {
        const method = request.method;
        const searchParams = url.searchParams.toString();
        const bgVal = bgParamForDebug || 'null_or_empty';
        const fgVal = fgParamForDebug || 'null_or_empty';

        let debugHtml = "<!-- MIDDLEWARE STAGE 1: DEBUG HEADERS -->\n";
        debugHtml += `<!-- METHOD: ${method} -->\n`;
        debugHtml += `<!-- SEARCH PARAMS (RAW): ${searchParams} -->\n`;
        debugHtml += `<!-- bgParam (parsed): ${bgVal} -->\n`;
        debugHtml += `<!-- fgParam (parsed): ${fgVal} -->\n`;
        debugHtml += `<!-- ORIGINAL CONTENT-TYPE: ${originalContentType} -->\n`;
        element.append(debugHtml, { html: true });
      }
    }
    // IMPORTANT: Create a new response object from the transformation for clarity
    response = new HTMLRewriter().on("head", new HeadDebugInjector()).transform(response);
  }

  // --- Conditional Logic for Dynamic Tags ---
  if (request.method === 'GET' && 
      bgParamForDebug && 
      fgParamForDebug && 
      originalContentType.includes("text/html")) {
    
    // If this block is entered, return a brand new, simple HTML response
    // This bypasses the second HTMLRewriter for now to test the condition itself.
    const simpleHtml = `
      <!DOCTYPE html>
      <html>
      <head><title>IF BLOCK EXECUTED</title></head>
      <body>
        <h1>Dynamic OG Condition Met!</h1>
        <p>bg: ${bgParamForDebug}</p>
        <p>fg: ${fgParamForDebug}</p>
        <!-- This response proves the IF condition was true. -->
      </body>
      </html>
    `;
    return new Response(simpleHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // If the above if-condition for dynamic tags was not met, 
  // return the response possibly modified by the first (debug) HTMLRewriter.
  return response; 
} 