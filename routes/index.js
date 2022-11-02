const express = require("express");
const router = express.Router();
const path = require("path");
const myDB = require("./../db/MyDB.js");

// get requests
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  }
});

router.get("/user", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  } else {
    res.redirect("/login");
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  } else {
    res.redirect("/login?msg=not-signed-in");
  }
});

router.post("/addworkout", async (req, res) => {
  try {
    console.log("Addworkout request");
    console.log("req", req.body);
    const user = req.body.user;
    const workout = req.body.workout;
    if (await myDB.addWorkout(user, workout)) {
      console.log("workout added successfully");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateworkout", async (req, res) => {
  try {
    console.log("Updateworkout request");
    console.log("req", req.body);
    const user = req.body.user;
    const workout = req.body.workout;
    const workoutId = req.body.workoutId;
    if (await myDB.updateWorkout(user, workout, workoutId)) {
      console.log("workout updated successfully");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteworkout", async (req, res) => {
  try {
    console.log("Deleteworkout request");
    console.log("req", req.body);
    const user = req.body.user;
    const workoutId = req.body.workoutId;
    if (await myDB.deleteWorkout(user, workoutId)) {
      console.log("workout deleted successfully");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    try {
      if (req.body.password.length < 6 || req.body.password.length < 6) {
        throw "Password must be at least 6 characters";
      }
      if (!(req.body.password === req.body.cpassword)) {
        throw "Password mismatch";
      }

      const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
      };

      if (await myDB.users(user, "register")) {
        //console.log(user);
        console.log("authenticated");
        res.redirect("/login");
      } else {
        console.log(user);
        console.log("error");
        res.redirect("/register?msg=error-authenticating");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/register?msg=registration-error");
    }
  }
});

router.post("/login", async (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };
      //console.log(user);

      const userInfo = await myDB.users(user, "login");

      if (userInfo) {
        //console.log(userInfo);
        console.log("authenticated");

        // save user in this session (after authenticating on Mongo)
        req.session.user = userInfo;

        res.redirect("/dashboard");
      } else {
        if (userInfo == null) {
          console.log("error");

          req.session.user = null;

          res.redirect("/login?msg=error-authenticating");
        } else {
          req.session.user = null;
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/getuser", (req, res) => {
  try {
    res.json({ user: req.session.user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getExercises", async (req, res) => {
  try {
    const exercises = await myDB.getExercises();
    res.json(exercises);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getHistory", async (req, res) => {
  try {
    const history = await myDB.getHistory(req.session.user);
    if (history) {
      res.json(history);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/getTemplates", async (req, res) => {
  try {
    const templates = await myDB.getTemplates(req.session.user);
    //console.log("get history",history);
    res.json(templates);
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateUserInfo", async (req, res) => {
  try {
    console.log(req.body.fname);
    console.log(req.body.lname);
    await myDB.users(req.session.user, "updateFName", req.body.fname);
    await myDB.users(req.session.user, "updateLName", req.body.lname);

    // resession the user to show updated fname and lname
    const userInfo = await myDB.users(req.session.user, "login");

    if (userInfo) {
      console.log("resessioned user...");

      // save user in this session (after authenticating on Mongo)
      req.session.user = userInfo;

      res.redirect("/user");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/updateUserInfo", (req, res) => {
  try {
    if (req.session.user) {
      console.log(req.session.user);
      res.json({ fname: req.body.fname, lname: req.body.lname });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/deleteUser", async (req, res) => {
  try {
    if (req.session.user) {
      await myDB.users(req.session.user, "deleteUser");
      req.session.user = null;
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.user = null;
    res.redirect("login?msg=logout-successful");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
