const accountModel = require('../models/account.model');

/**
 * controller
 */

async function createAccountController(req, res) {
    const user = req.user;
    
    const account = await accountModel.create({
      user:user._id
      
    })
    res.status(201).json({
      message : "Account created successfully",
      // user:user.name,
      account
    })
}

module.exports = {createAccountController};