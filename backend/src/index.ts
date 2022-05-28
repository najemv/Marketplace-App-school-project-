import express from "express";
import cors from "cors";
import {category, offer} from "./resources";
import { off } from "process";
const api = express();
const port = process.env.PORT ?? 4000;

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

api.get("/category", category.list);
api.get("/category/:name", category.get);

api.get("/offer/:id", offer.getById);
api.post("/offer", offer.createOffer);
api.put("/offer/:id", offer.updateOffer);
api.delete("/offer/:id", offer.deleteOffer);


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
