import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { validatorSchema } from "../validator/validatorSchema.mjs";
import { UserModel } from "../mongoose/schema/user.mjs";
import { hashPassword } from "../passwordcryp/bcrypt.mjs";

const route = Router();

route.get("/api/user", (request, response) => {
  if (!request.user) return response.status(401).send(request.user);
  response.status(200).send(request.user);
});

// route.post("/api/user", checkSchema(validatorSchema), (request, response) => {
//   const result = validationResult(request);
//   if (!result.isEmpty()) {
//     return response.status(401).send(result.array());
//   }
//   const data = matchedData(request);
//   console.log(data);
//   const randomIndex = Math.floor(Math.random() * 3000);
//   const newUser = { id: randomIndex, ...data };
//   user.push(newUser);
//   return response.status(201).send(newUser);
// });

route.post(
  "/api/user",
  checkSchema(validatorSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(401).send(result.array());
    const data = matchedData(request);

    data.password = hashPassword(data.password);
    //obtenemos el password del data y lo pasamos atrace de hashPassword para encriptarla
    const newUser = new UserModel(data);
    // body obtendra toda la inforamacion del nuevo usuario que sera pasada
    // a nuestra dataBase a traves de UserModel. UserModel tiene unos parametros
    // que hemos fijado previamente y que deben ser respetados
    try {
      const savedUser = await newUser.save();
      // savedUser guardara nuestro nuevo usuario para ello tenemos que utilizar el
      // metodo save(). Sin embargo este metodo es asincrono por lo que es obligatorio
      //usar await y async
      response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return response.sendStatus(400);
    }
  }
);

export default route;
