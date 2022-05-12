const http = require("http");

const DEFAULT_USER = { username: "cordeirovhc", password: "123456" };

const routes = {
  "/login:post": async (req, res) => {
    // res é um async iterator
    for await (const data of req) {
      const { username, password } = JSON.parse(data);

      const isValid =
        username === DEFAULT_USER.username &&
        password === DEFAULT_USER.password;

      if (!isValid) {
        res.writeHead(401);
        res.write("login fail");
        return res.end();
      }

      res.write("login ok");
      return res.end();
    }
  },
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },
  default: (req, res) => {
    res.write("hello world");
    return res.end();
  },
};

const handler = function (req, res) {
  const { url, method } = req;
  const routeKey = `${url}:${method}`.toLowerCase();

  const route = routes[routeKey] || routes.default;

  /* if (routeKey === null) {
    return;
  } */

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  return route(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;
