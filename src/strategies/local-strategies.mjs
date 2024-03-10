import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../mongoose/schema/user.mjs";
import { comparePassword } from "../passwordcryp/bcrypt.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await UserModel.findById(id);
    //findById will help us find user by id, it is async
    if (!findUser) throw Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username });
      //findOne method to find username.
      // it is async
      // if user is not find findOne will return one
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password)) throw new Error("Password not valid");
      //aqui utilizamos comparePassword para comparar la password sin encriptat con la encriptada.
      //en el momento de logearse
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
