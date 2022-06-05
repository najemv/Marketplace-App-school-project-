import express from "express";
import cors from "cors";
import {category, offer, user} from "./resources";
import { off } from "process";
const api = express();
const port = process.env.PORT ?? 4000;
import path from 'path';
const pathToFile = path.resolve(__dirname, '../public');

api.use('/static', express.static(pathToFile));
api.use(express.json());
api.use(cors());

api.get("/", (req, rsp) => {
  return rsp.send({
    status: "ok",
    data: {
      message: "Welcome to our bazoš server"
    }
  });
});

// Gets list of category names (for panel)
api.get("/category", category.list);
// Gets all offers in given category
api.get("/category/:id", category.get);

// Gets detailed info about one offer
api.get("/offer/:id", offer.getById);
// Gets all offers
api.get("/offer", offer.getAll);
// Creates new offer
api.post("/offer", offer.createOffer);
// Updated offer
api.put("/offer/:id", offer.updateOffer);
// Deletes offer
api.delete("/offer/:id", offer.deleteOffer);


api.get("/user/:nickname", user.getUser);
api.put("/user/:nickname", user.UpdateUser);

api.post("/login", user.login);
api.post("/register", user.createUser);

api.post("/user/check", user.checkExistence);

//api.get("/user", user.get);
//api.get("/user/:id", user.getById);
//api.put("/user", user.update);
//
//api.get("/channel", channel.get);
//api.get("/channel/:id", channel.getById);
//api.post("/channel", channel.store);
//
//api.post("/message", message.store);
//api.put("/message/:id", message.update);
//api.delete("/message/:id", message.remove);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
