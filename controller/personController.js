// ./controllers/person
const mongoose = require("mongoose");
const User = require("../models/User");
const Person = require("../models/Person");
const jwt = require("jsonwebtoken");

const { connectToDatabase } = require("../helper/dbConnect");

personController = {
  async getPersons(req, res) {
    await connectToDatabase();
    try {
      const person = await Person.find({}).exec();
      res.status(200).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },

  async createPerson(req, res) {
    try {
      const person = await Person.create({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
      });
      res.status(201).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },

  async updatePerson(req, res) {
    try {
      const { _id, first_name, last_name, dni, sex, cell_phone, status } =
        req.body;
      const person = await Person.findByIdAndUpdate(
        { _id },
        { first_name, last_name, dni, sex, cell_phone, status }
      );
      res.status(201).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },

  async deletePerson(req, res) {
    try {
      const { id } = req.body;
      const person = await Person.findByIdAndRemove(id);
      res.status(201).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },
  async findPerson(req, res) {
    try {
      const { id } = req.params;
      const person = await Person.findById(id);
      res.status(200).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },

  async findFilterPerson(req, res) {
    try {
      const person = await Person.aggregate([
        {
          $match: {
            status: "pending",
            sex: "Male",
          },
        },
      ]).sort({ first_name: "asc" });
      res.status(200).json({ success: true, data: person });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },
};
module.exports = personController;
