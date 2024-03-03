/**
 * POST http://localhost/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller")
/**
 * POST http://localhost/ecomm/api/v1/auth/signup
 * routes for singUp
 */
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",authController.signup)
}
/**
 * POST http://localhost/ecomm/api/v1/auth/signin
 * routes for sign in
 */
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signin",authController.signin)
}