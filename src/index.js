const http = require("http");
const url = require("url");
const querystring = require("querystring");
const { info, error } = require("./modules/my-log");
const consts = require("./utils/const");
const firebase = require("../libs/firebas");
const { countries } = require("countries-list");

/**
 * This method return a server rendered
 * @author CodeRevenge
 */
const server = http.createServer((request, response) => {
  const parsed = url.parse(request.url);
  console.log(parsed);

  const pathname = parsed.pathname;

  const query = querystring.parse(parsed.query);
  console.log(query);
  

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>HOME</p></body></html>");
    response.end();
  } else if (pathname == "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>BYE</p></body></html>");
    response.end();
  } else if (pathname == "/country") {
    const result = info(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname == "/error") {
    const result = error(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><body><p>NOT FOUND</p></body></html>");
    response.end();
  }
});

server.listen(4000);
console.log("running on 4000");
