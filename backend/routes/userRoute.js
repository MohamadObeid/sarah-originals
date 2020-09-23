import express from "express";
import User from "../modals/userModel";
import { getToken } from "../util";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.post("/signin", async (req, res) => {
  var signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if (signinUser) {
    var lastIndex = signinUser.activity.length - 1
    if (signinUser.active && signinUser.activity[lastIndex].end) {
      signinUser.activity = [...signinUser.activity, { start: Date.now() + 10800000, IP: req.body.IP }]
    } else signinUser.activity = [...signinUser.activity, { start: Date.now() + 10800000, end: Date.now() + 21000000, IP: req.body.IP }]
    signinUser.active = true
    signinUser.lastActivity = Date.now() + 10800000
    signinUser = await signinUser.save()
    res.send({
      _id: signinUser.id,
      active: signinUser.active,
      password: signinUser.password,
      lastActivity: signinUser.lastActivity,
      activity: signinUser.activity,
      name: signinUser.name,
      phone: signinUser.phone,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
      isCallCenterAgent: signinUser.isCallCenterAgent,
      isAttendanceManager: signinUser.isAttendanceManager,
      image: signinUser.image,
      employeeId: signinUser.employeeId,
    })

    setTimeout(async () => {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      })
      if ((Date.now() + 10800000) - user.lastActivity < 30000) {
        console.log('return')
        return
      } else {
        console.log((Date.now() + 10800000) - user.lastActivity)
        var lastIndex = user.activity.length - 1
        user.activity[lastIndex].end = Date.now() + 10800000
        user.active = false
        user.save()
        //console.log(user)
      }
    }, 31000)

  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
})

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    activity: [{ date: Date.now() + 10800000, IPaddress: req.body.IP }],
    active: true
  })

  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser._id,
      activity: newUser.activity,
      active: newUser.active,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
      isCallCenterAgent: newUser.isCallCenterAgent,
      isAttendanceManager: newUser.isAttendanceManager,
      image: newUser.image && newUser.image,
      employeeId: newUser.employeeId && newUser.employeeId,
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.post("/create", async (req, res) => {
  const user = new User({
    name: req.body.name,
    active: req.body.active,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isCallCenterAgent: req.body.isCallCenterAgent,
    isAttendanceManager: req.body.isAttendanceManager,
    image: req.body.image && req.body.image,
    employeeId: req.body.employeeId && req.body.employeeId,
  })

  const newUser = await user.save();
  if (newUser) {
    return res.status(201).send({ message: "New user created!", data: newUser })
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Mohamad Baqer",
      active: true,
      email: "dm@beirutgrouptt.com",
      phone: '70564466',
      password: "12345",
      isAdmin: true,
      isCallCenterAgent: true,
      isAttendanceManager: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("", isAuth, isAdmin, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const userDeleted = await User.findByIdAndRemove(req.params.id);
  if (userDeleted) {
    return res.status(200).send({ message: "User has been deleted!", data: userDeleted });
  }
  return res.status(500).send({
    message: "Error in deleting user!"
  })
});

router.put("/:id", isAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    user.name = req.body.name;
    user.active = req.body.active;
    user.activity = req.body.activity && req.body.activity;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password && req.body.password;
    user.isAdmin = req.body.isAdmin;
    user.isCallCenterAgent = req.body.isCallCenterAgent;
    user.isAttendanceManager = req.body.isAttendanceManager;
    user.image = req.body.image && req.body.image;
    user.employeeId = req.body.employeeId && req.body.employeeId;
  }
  const userUpdated = await user.save();
  if (userUpdated) {
    return res.status(200).send({ message: "User has been updated!", data: userUpdated })
  }
  return res.status(500).send({
    message: "Error in updating user!"
  })
})

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId })
  res.send(user)
});

export default router;
