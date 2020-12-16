const express = require("express");
const path = require("path");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const usersRoute = require("./routes/users");
const profileRoute = require("./routes/profile");
const managersRouter = require("./routes/managers");
const departRouts = require("./routes/departments");
const contractRoute = require("./routes/contracts");
const helmet = require("helmet");
const app = express();
app.use(express.json());
app.use(helmet());
let redisClient = redis.createClient();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: false,
    cookie: {
      maxAge: 86400000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// app.use(function (req, res, next) {
//   if (req.session.user) return next();
//   return req.session.destroy(function (err) {
//     if (err) return res.status(500).json({ error: err });
//     return res.status(401);
//   });
// });

app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/managers", managersRouter);
app.use("/api/departments", departRouts);
app.use("/api/contracts", contractRoute);

app.use("*", (req, res, next) => {
  return res.status(404).json({ error: "404 Not Found" });
});

app.listen(4444, "0.0.0.0", () => {
  console.log("server is running on port 4444");
});
