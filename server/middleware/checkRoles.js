require("express");
const { model } = require("../models");

const checkBuyer = async (req, res, next) => {
    try {
      const username = req.username;
      // Check if the user is a buyer by querying the buyer table
      if (await model.getBuyer(username)) {
        // If the user is a buyer, call the next middleware function
        next();
      } else {
        // If the user is not a buyer, return an error response
        res.status(403).json({ message: 'Forbidden: You are not buyer!' });
      }
    } catch (error) {
      // Handle errors
      next(error);
    }
  };
  
const checkSeller = async (req, res, next) => {
    try {
        const username = req.username;
        // Check if the user is a seller by querying the seller table
        if (await model.getSeller(username)) {
            // If the user is a seller, call the next middleware function
            next();
        } else {
            // If the user is not a seller, return an error response
            res.status(403).json({ message: 'Forbidden: You are not seller!' });
        }
    } catch (error) {
        // Handle errors
        next(error);
    }
};

const checkAdmin = async (req, res, next) => {
    try {
        const username = req.username;

        // Check if the user is an admin by querying the wh_admin table
        if (await model.getWHAdmin(username)) {
            // If the user is an admin, call the next middleware function
            next();
        } else {
            // If the user is not an admin, return an error response
            res.status(403).json({ message: 'Forbidden: You are not admin!' });
        }
    } catch (error) {
        // Handle errors
        next(error);
    }
};

module.exports = {
    checkBuyer,
    checkSeller,
    checkAdmin
}