const express = require("express");
const database = require("./modules/db.js");
const db = new database();
const server = express();
const port = process.env.PORT || 8080;


server.set("port", port);

// middleware ---------------------------

server.use(express.static("public"));
server.use(express.json());

server.post("/list", function (req, res, next) {
  const name = req.body.name;
  const userID = req.body.userID
  const list = db.addList(name, userID);

  console.log(name,userID,list)
  res.status(200).send(JSON.stringify(list));
});

server.get("/list/:id", (req, res, next) => {
  const name = req.body.name;
  const list = db.getList(listID);

  if(list){
   res.status(200).send(JSON.stringify(list)).end()
  } else{
    res.status(404).end()
  }

});

server.get("/list/user/:userId", (req,res,next)=>{
  const userId = req.params.userId;
  const lists = db.getListsBelongingToUser(userId);
  res.status(200).send(JSON.stringify(lists)).end()
})

server.put("/list/:id", (req, res, next) => {
 
  const listID = req.params.id;
  const name = req.body.name;
  const items = req.body.items;
  const userID = req.body.userId;
  const updateList = db.updateList(listID, name, userID, items);
  res.status(200).send(JSON.stringify(updateList));

  // 
  //db.updateList(listID, name, items);
});

server.delete("/list/:id", (req, res, next) => {
  const listID = req.params.id;
  const list = db.deleteList(listID);
  res.status(200).send(JSON.stringify(list));
  //db.deleteList(listID);
});

server.post("/user", function (req, res, next) {
  const name = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const user = db.addUser(name, email, password);
  res.status(200).send(JSON.stringify(user));
});

server.post("/user/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user = db.findUser(email, password);
  if (user) {
    res.status(200).send(
      JSON.stringify({
        id: user.id,
        name: user.name,
      })
    );
  } else {
    res.status(404).end();
  }
});

server.put("/user/:id", function (req, res, next) {
  const userId = req.body.userId;
  const name = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  res.status(200).end();
});

server.delete("/user/:id", function (req, res, next) {
  const userId = req.params.userId;
  const name = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  res.status(200).end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
