const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: String,
  designation: String,
  contact: Number,
  address: String,
  city: String,
  state: String,
  primaryEmergencyContactName: String,
  emergencyNo1: String,
  relationshipPrimary: String,
  secondaryEmergencyContactName: String,
  emergencyNo2: String,
  relationshipSecondary: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
