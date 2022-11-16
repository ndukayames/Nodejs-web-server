const http = require("http");

const friends = [
  {
    id: "1",
    name: "James",
  },
  {
    id: "2",
    name: "Nduka",
  },
];

const server = http.createServer();

server.on("request", (req, res) => {
  // split the request url so we can query it
  let urlLineItems = req.url.split("/");
  // now we'll get an array of the url content
  // eg localhost:3000/probe/1 => ["", "probe", "1"]

  if (urlLineItems[1] === "friends") {
    if (urlLineItems.length > 2) {
      // this means we have friend ID
      let friendIndex = Number(urlLineItems[2]);

      let friend = friends.filter((friend) => {
        return friendIndex === Number(friend.id);
      });
      // res.writeHead(200, { "Content-Type": "application/json" });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          msg: friend,
        })
      );
    } else {
      // return all friends
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          msg: friends,
        })
      );
    }
  } else if (urlLineItems[1] === "probe") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li> Hello there! </li>");
    res.write("<li> What do you think about this server </li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.end(
      JSON.stringify({
        msg: "Hi!, this route isn't mapped to any logic",
      })
    );
  }
});

server.listen(3000, () => {
  console.log("server started!");
});
