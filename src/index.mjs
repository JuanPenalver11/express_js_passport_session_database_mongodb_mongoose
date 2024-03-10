import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import routeUser from "./routes/userRoute.mjs";
import mongoose from "mongoose";  // npm i mongoose
// es una biblioteca que permite el modelado de nuestra base de datos; que es lo que esperamos y en que formato
import MongoStore from "connect-mongo"; //npm i connect-mongo
//connect-mongo se usa para el almacenamiento de datos en una base de datos como mongoDB en lugar
// de almacenar los datos en el broswer, lo cual hace que los datos sean persistentes 
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
    saveUninitialized: false, //if true will save all data everytime even when you are not modifying it. 
    // waste of storage - it is useful when for instance user add products to a car without being logged in
    // but when logged in the cart still hold the products added
    resave: false, // force the cookie to be re-saved 
    cookie: {
      maxAge: 60000 * 60,
    },
    //store se utiliza para especificar donde se almacenan las sesiones del usuario.
    //MongoStore.create se utiliza crea una instancia para almacenar los datos del cliente
    store: MongoStore.create({
        client:mongoose.connection.getClient(),
        // client:mongoose.connection.getClient() establece el puente entre mogoDB y mongoose para compartir 
        // y extraer datos
    })
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
  if (!request.user) return response.sendStatus(401);
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
