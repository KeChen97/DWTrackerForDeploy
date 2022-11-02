const MongoClient = require("mongodb").MongoClient;
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const mongourl = process.env.MONGO_URL || "mongodb://localhost:27017";

  //const PAGE_SIZE = 20;

  myDB.getTemplates = async function (user) {
    const DB_NAME = "workoutDB";
    const COL_NAME = "templates";
    const client = new MongoClient(mongourl);
    const templatesColl = client.db(DB_NAME).collection(COL_NAME);
    console.log("templatesDB connected");
    // const res = await userColl.findOne({ email: user.email });
    const publicTemplates = await templatesColl.find().toArray();
    const personalTemplates = await templatesColl
      .find({ user: user.email })
      .toArray();
    if (personalTemplates) {
      const templates = publicTemplates.concat(personalTemplates);
      return templates;
    } else {
      return publicTemplates;
    }
  };

  myDB.getExercises = async function (query = {}) {
    const DB_NAME = "workoutDB";
    const COL_NAME = "exercises";
    const client = new MongoClient(mongourl);
    const exercisesColl = client.db(DB_NAME).collection(COL_NAME);
    console.log("exerciseDB connected");
    return await exercisesColl.find(query).toArray();
  };

  myDB.getHistory = async function (user) {
    const DB_NAME = "cs5610";
    const DB_COLLECTION = "users";
    const client = new MongoClient(mongourl);
    const userColl = client.db(DB_NAME).collection(DB_COLLECTION);
    console.log("historyDB connected");
    const res = await userColl.findOne({ email: user.email });
    const history = res.exerciseHistory;
    // console.log(typeof(history));
    // console.log(history[0]);
    console.log("I got history data", history);
    return history;
  };

  myDB.deleteWorkout = async function (user, workoutId) {
    const DB_NAME = "cs5610";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl);
    const usersCol = client.db(DB_NAME).collection(COL_NAME);
    const res = await usersCol.findOne({ email: user.email });
    if (res) {
      console.log("adding workout.", res);

      await usersCol.updateOne(
        { email: user.email },
        {
          $pull: {
            exerciseHistory: {
              id: workoutId,
            },
          },
        }
      );

      return true;
    } else {
      console.log("No user found");
      return false;
    }
  };
  myDB.updateWorkout = async function (user, workoutArr, workoutId) {
    const DB_NAME = "cs5610";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl);
    const usersCol = client.db(DB_NAME).collection(COL_NAME);

    const res = await usersCol.findOne({ email: user.email });
    if (res) {
      console.log("adding workout.", res);

      await usersCol.updateOne(
        { email: user.email, "exerciseHistory.id": workoutId },
        {
          $set: {
            "exerciseHistory.$.workout": workoutArr,
          },
        }
      );

      return true;
    } else {
      console.log("No user found");
      return false;
    }
  };

  myDB.addWorkout = async function (user, workoutArr) {
    const DB_NAME = "cs5610";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl);
    const usersCol = client.db(DB_NAME).collection(COL_NAME);

    const date = new Date();
    const id = uuidv4();
    // The data should be like this:
    // user: {
    //   _id: '635f1f4b236cdf679aca1743',
    //   fname: 'ke',
    //   lname: 'chen',
    //   email: 'mchenkem@hotmail.com',
    //   password: '123456',
    //   cpassword: '123456'
    //   exerciseHistory : [
    //     {
    //       date : 2022-10-31,
    //       workout: [
    //         { name: 'Bounds', setNum: '1', weightNum: '3', repNum: '4' },
    //         { name: 'Burpee', setNum: '5', weightNum: '6', repNum: '7' }
    //       ]
    //     },
    //     {
    //       date : 2022-10-30,
    //       workout: [
    //         { name: 'Bounds', setNum: '1', weightNum: '3', repNum: '4' },
    //         { name: 'Burpee', setNum: '5', weightNum: '6', repNum: '7' }
    //       ]
    //     }
    //   ]
    // }

    const res = await usersCol.findOne({ email: user.email });
    if (res) {
      console.log("adding workout.", res);

      await usersCol.updateOne(
        { email: user.email },
        {
          $push: {
            exerciseHistory: {
              id: id,
              date: date,
              workout: workoutArr,
            },
          },
        }
      );

      return true;
    } else {
      console.log("No user found");
      return false;
    }
  };

  myDB.users = async function (user, actionType = "", actionVal = "") {
    const mongourl = process.env.MONGO_URL || "mongodb://localhost:27017";
    const DB_NAME = "cs5610";
    const DB_COLLECTION = "users";

    const client = new MongoClient(mongourl);

    const db = client.db(DB_NAME);
    const usersCol = db.collection(DB_COLLECTION);

    if (actionType == "register") {
      const res = await usersCol.findOne({ email: user.email });
      if (res) {
        console.log(res);
        if (
          res.fname == user.fname &&
          res.lname == user.lname &&
          res.password == user.password &&
          res.cpassword == user.cpassword
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("adding to db...");
        usersCol.insertOne(user);
        return true;
      }
    }

    if (actionType == "login") {
      const res = await usersCol.findOne({ email: user.email });
      if (res) {
        console.log("res from db is...", res);
        if (res.password == user.password) {
          return res;
        } else {
          return null;
        }
      } else {
        console.log("create an account...");
        return false;
      }
    }

    if (actionType == "updateFName") {
      const res = await usersCol.findOne({ email: user.email });
      if (res) {
        console.log("updating fname.", res);
        await usersCol.updateOne(
          { email: user.email },
          { $set: { fname: actionVal } }
        );
      }
    }

    if (actionType == "updateLName") {
      const res = await usersCol.findOne({ email: user.email });
      if (res) {
        console.log("updating lname", res);
        await usersCol.updateOne(
          { email: user.email },
          { $set: { lname: actionVal } }
        );
      }
    }

    if (actionType == "deleteUser") {
      const res = await usersCol.findOne({ email: user.email });
      if (res) {
        console.log("removing user..", res);
        await usersCol.deleteOne({ email: user.email });
      }
    }
  };
  return myDB;
}

module.exports = MyMongoDB();
