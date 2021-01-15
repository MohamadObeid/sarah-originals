import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
    config.JWT_SECRET,
    { expiresIn: "48h" },
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.get('Authorization');
  const token = authorization.replace('Bearer ', '');
  if (token)
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).send({ msg: "Invalid Token" })
      req.user = decoded
      return next()
    })

  else return res.status(401).send({ msg: 'Token is not supplied' });
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  else return res.status(401).send({ msg: "Admin token is not valid." })
}

export { getToken, isAuth, isAdmin };