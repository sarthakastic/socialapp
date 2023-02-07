import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log("xmncbxjk");

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error, "auth fails");
  }
};

export default auth;
