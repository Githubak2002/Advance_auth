import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken




export const verifyingToken = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.cookies.LoginToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token'});
    }

    console.log( "Kya hai ye decoded ",decoded );
    
    req.user = decoded;
    next();
  });
};

