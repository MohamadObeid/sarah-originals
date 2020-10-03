import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  createdOn: { type: Date, required: false, default: Date.now() + 10800000 },
  active: { type: Boolean, required: false, default: true },
  lastActivity: { type: Date, required: false },
  activity: {
    type: [{
      start: { type: Date, required: false },
      end: { type: Date, required: false },
      IPaddress: { type: String, required: false },
    }], required: false
  },
  name: { type: String, required: true, default: '' },
  email: { type: String, required: true, unique: true, dropDups: true },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false, default: false },
  employeeId: { type: String, required: false },
  image: { type: String, required: false },
  //link employee id to userInfo
  isCallCenterAgent: { type: Boolean, required: false },
  isAttendanceManager: { type: Boolean, required: false },
  isOrderManager: { type: Boolean, required: false },
  //checkin: { type: Array, required: false },


  /*ipAddress: {
    longitude: { type: String, required: true, default: '' },
    latitude: { type: String, required: true, default: '' },
    city: { type: String, required: true, default: '' },
  },

  geoLocation: {
    longitude: { type: String, required: true, default: '' },
    latitude: { type: String, required: true, default: '' },
    city: { type: String, required: true, default: '' },
  },*/

  address: {
    type: [{
      city: { type: String, required: false },
      region: { type: String, required: false },
      building: { type: String, required: false },
    }], required: false, default: []
  },

  /*creditCard: {
    type: [{
      bankName: { type: String, required: true, default: '' },
      cardNumber: { type: Number, required: true, default: null },
      cardHolder: { type: String, required: true, default: '' },
      expiryDate: { type: String, required: true, default: '' },
      cvv2: { type: Number, required: true, default: null },
    }], required: true, default: []
  },*/
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
