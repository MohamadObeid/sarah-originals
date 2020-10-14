import express from "express";
import User from "../modals/userModel";
import { getToken } from "../util";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.post("/signin", async (req, res) => {
  var user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  var lastIndex = user.activity.length ? user.activity.length - 1 : 0
  //console.log(user)
  if (user) {
    if (req.body.request === 'signout') { // signout request
      user.activity[lastIndex].end = Date.now() + 10800000
      user.lastActivity = Date.now() + 10800000
      user.active = false
      user = await user.save()
      console.log(user.email + ' request signout')
      return res.send(undefined)

    } else if (req.body.request === 'signin') { //signin request
      if (!user.active) {
        if (lastIndex > 0 && !user.activity[lastIndex].end)
          user.activity[lastIndex].end = user.lastActivity + 25000
        user.active = true
        user.activity = [...user.activity, { start: Date.now() + 10800000, IP: req.body.IP }]
      } if (lastIndex === 0) {
        user.active = true
        user.activity = [...user.activity, { start: Date.now() + 10800000, IP: req.body.IP }]
      }
      user.lastActivity = Date.now() + 10800000
      user = await user.save()
      console.log(user.email + ' request signin')

    } else if (!user.activity[lastIndex].end && user.active) { //set user Active
      user.lastActivity = Date.now() + 10800000
      user = await user.save()
      console.log(user.email + ' set Active')

    } else if (user.activity[lastIndex].end && !user.active) {
      user.active = true
      user.activity = [...user.activity, { start: Date.now() + 10800000, IP: req.body.IP }]
      user.lastActivity = Date.now() + 10800000
      user = await user.save()
      console.log(user.email + ' resignin')
    }

    user.active &&
      res.send({
        _id: user._id,
        //activity: user.activity,
        password: user.password,
        active: user.active,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: getToken(user),
        isCallCenterAgent: user.isCallCenterAgent,
        isAttendanceManager: user.isAttendanceManager,
        isOrderManager: user.isOrderManager,
        image: user.image && user.image,
        employeeId: user.employeeId && user.employeeId,
        address: user.address && user.address,
        orderList: user.orderList && user.orderList,
      })

    // set user inactive
    setTimeout(async () => {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      })
      if (user.active) {
        if ((Date.now() + 10800000) - user.lastActivity < 30000) {
          console.log(user.email + ' return')
          return
        } else {
          console.log((Date.now() + 10800000) - user.lastActivity)
          var lastIndex = user.activity.length - 1
          user.activity[lastIndex].end = Date.now() + 10800000
          user.active = false
          user.save()
          //console.log(user)
        }
      }
    }, 30000)

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
    isAdmin: req.body.isAdmin,
    isCallCenterAgent: req.body.isCallCenterAgent,
    isAttendanceManager: req.body.isAttendanceManager,
    isOrderManager: req.body.isOrderManager,
    isOrderManager: req.body.isOrderManager,
    activity: [{ date: Date.now() + 10800000, IPaddress: req.body.IP }],
    active: true
  })

  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser._id,
      //activity: newUser.activity,
      password: newUser.password,
      active: newUser.active,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
      isCallCenterAgent: newUser.isCallCenterAgent,
      isAttendanceManager: newUser.isAttendanceManager,
      isOrderManager: newUser.isOrderManager,
      image: newUser.image && newUser.image,
      employeeId: newUser.employeeId && newUser.employeeId,
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

/*router.post("/create", async (req, res) => {
  const user = new User({
    name: req.body.name,
    active: req.body.active,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isCallCenterAgent: req.body.isCallCenterAgent,
    isAttendanceManager: req.body.isAttendanceManager,
    isOrderManager: req.body.isOrderManager,
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
      isOrder
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});*/

router.get("", isAuth, isAdmin, async (req, res) => {
  const users = await User.find({})
  res.send(users);
});

// id list: get users
router.post("", isAuth, isAdmin, async (req, res) => {
  var users = await User.find({ employeeId: req.body })
  users = users.map(user => {
    return {
      employeeId: user.employeeId,
      active: user.active,
      lastActivity: user.lastActivity
    }
  })
  res.send(users)
})

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
    user.name = req.body.name ? req.body.name : user.name;
    user.active = req.body.active ? req.body.active : user.active;
    user.activity = req.body.activity ? req.body.activity : user.activity;
    user.email = req.body.email ? req.body.email : user.email;
    user.phone = req.body.phone ? req.body.phone : user.phone;
    user.password = req.body.password ? req.body.password : user.password;
    user.isAdmin = req.body.isAdmin ? req.body.isAdmin : user.isAdmin;
    user.isCallCenterAgent = req.body.isCallCenterAgent ? req.body.isCallCenterAgent : user.isCallCenterAgent;
    user.isAttendanceManager = req.body.isAttendanceManager ? req.body.isAttendanceManager : user.isAttendanceManager;
    user.isOrderManager = req.body.isOrderManager ? req.body.isOrderManager : user.isOrderManager;
    user.image = req.body.image ? req.body.image : user.image;
    user.employeeId = req.body.employeeId ? req.body.employeeId : user.employeeId;
    user.address = req.body.address ? req.body.address : user.address;
    if (req.body.orderList) user.orderList = [...user.orderList, req.body.orderList]
  }
  const userUpdated = await user.save();
  if (userUpdated) {
    return res.status(200).send({ message: "User has been updated!", data: userUpdated })
  }
  return res.status(500).send({
    message: "Error in updating user!"
  })
})

router.post("/getUser", async (req, res) => {
  const phone = req.body.phone
  //console.log('phone', phone)
  const user = await User.findOne({ phone: phone }) || undefined
  user && res.send({
    _id: user._id,
    phone: user.phone,
    email: user.email,
    name: user.name,
    image: user.image,
    address: user.address,
  })
})

export default router;
