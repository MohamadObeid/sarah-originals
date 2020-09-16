import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  createdOn: { type: Date, required: false, default: Date.now },
  active: { type: Boolean, required: false, default: true },
  lastActivity: {
    date: { type: Date, required: false, default: Date.now },
    IPaddress: { type: String, required: false },
  },
  name: { type: String, required: true, default: '' },
  email: { type: String, required: true, unique: true, dropDups: true },
  phone: { type: String, required: false },
  password: { type: String, required: false },
  isAdmin: { type: Boolean, required: true, default: false },
  employeeId: { type: String, required: false },
  image: { type: String, required: false },
  //link employee id to userInfo
  isCallCenterAgent: { type: Boolean, required: false },
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
  },

  deliveryAddress: {
    type: [{
      city: { type: String, required: true, default: '' },
      region: { type: String, required: true, default: '' },
      building: { type: String, required: true, default: '' },
    }], required: true, default: []
  },

  creditCard: {
    type: [{
      bankName: { type: String, required: true, default: '' },
      cardNumber: { type: Number, required: true, default: null },
      cardHolder: { type: String, required: true, default: '' },
      expiryDate: { type: String, required: true, default: '' },
      cvv2: { type: Number, required: true, default: null },
    }], required: true, default: []
  },*/

  active: { type: Boolean, required: true, default: false },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
