const Employee = require("../models/Employee");

exports.empRegistration = async (req, res) => {
  try {
    const {
      name,
      designation,
      contact,
      address,
      city,
      state,
      primaryEmergencyContactName,
      emergencyNo1,
      relationshipPrimary,
      secondaryEmergencyContactName,
      emergencyNo2,
      relationshipSecondary,
    } = req.body;

      var employee = await Employee.findOne({name: name});
      if (employee) {
          res.status(400).send("Employee already exists");
      } else {
         employee = await Employee.create({
           name: name,
           designation: designation,
           contacts: contact,
           address: address,
           city: city,
           state: state,
           primaryEmergencyContactName: primaryEmergencyContactName,
           emergencyNo1: emergencyNo1,
           relationshipPrimary: relationshipPrimary,
           secondaryEmergencyContactName: secondaryEmergencyContactName,
           emergencyNo2: emergencyNo2,
           relationshipSecondary: relationshipSecondary,
         });
         res.status(201).send("Employee created successfully");
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
};

exports.listEmployees = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const employees = await Employee.find()
      .skip(skip)
      .limit(Number(limit));

    const totalEmployees = await Employee.countDocuments();
    res.json({
      page: Number(page),
      limit: Number(limit),
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...employeeData } = req.body;

      const employee = await Employee.findByIdAndUpdate(id, employeeData, {
          new: true,
      });

    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};
