import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import routeUser from "./routes/userRoute.mjs";
import mongoose from "mongoose";
import "./strategies/local-strategies.mjs";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/learning_dataBS")
  // connect to the mogodb compass database
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser("HelloWorld"));
app.use(
  session({
    secret: "holi",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routeUser);

app.get("/", (request, response) => {
  response.send("Holi");
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.send(200);
});

app.get("/api/auth/status", (request, response) => {
    console.log('status get endpoint')
    console.log(request.user)
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return sendStatus(401);
  request.logOut((err) => {
    if (err) {
      return response.sendStatus(400);
    } else {
      return response.status(200).send("You have logged out");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT in ${PORT}`);
});
