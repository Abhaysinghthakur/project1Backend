const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const redis = require('../libs/redisLib');

/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email not correct', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, 'password not in correct format', 500, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                logger.error('email field is missing in user creation', 'userController:signUpFunction', 5);
                let apiResponse = response.generate(true, 'Email not found', 500, null);
                reject(apiResponse);
            }
        })
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'email': req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error('Error While User Creation', 'UserController:CreateUser', 10)
                        let apiResponse = response.generate(true, 'Fail to Create User', 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || ' ' ,
                            email: req.body.email,
                            mobileNumber: req.body.mobileNumber || 0,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        console.log(newUser)
                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'UserController:createUser', 10)
                                let apiResponse = response.generate(true, 'Fail to Create User', 500, null);
                                reject(apiResponse);
                            } else {
                                let newUserObj = newUser.toObject();
                                redis.setANewOnlineUserInHash('allUsers', newUser.userId, `${newUser.firstName} ${newUser.lastName}`, (redisErr, redisResult) => {
                                    if (redisErr) {
                                        logger.error(true, "userController:signupfunctio:createUser:redis:setnewonlineUser", 10);
                                    } else {
                                        logger.info(false, "userController:signupfunctio:createUser:redis:setnewonlineUser", 0)
                                    }
                                })
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User already present with this emailId', 'UserController:CreateUser', 10)
                        let apiResponse = response.generate(true, 'User already present with this email id', 500, null);
                        reject(apiResponse);
                    }
                })
        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error('Error while generating Token', "userController:generateToken", 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    console.log(tokenDetails)
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }//end of save token 

    validateUserInput(req, res)
        .then(createUser)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            delete resolve.password;
            let apiResponse = response.generate(false, 'User Created', 200, resolve);
            console.log(apiResponse)
            res.send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ 'email': req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log("here finduser")
                        logger.error('error while finding user in DB', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'Error while finding user Data', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        console.log("here finduser2")
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'User Not present with this email Id', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log("here finduser3")
                        console.log(userDetails)
                        resolve(userDetails)
                    }
                });
            } else {
                let apiResponse = response.generate(true, 'Email missing', 500, null)
                reject(apiResponse)
            }
        })//end of promise
    }//end of findUser

    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, result) => {
                if (err) {
                    console.log("here validatepassword 1")
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (result) {
                    console.log("here validate password")
                    let retrievedUserDetailsObj = userDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    console.log("here validatepassword")
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })//end of promise
    }//end of validatePassword

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error('Error while generating Token', "userController:generateToken", 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    console.log(tokenDetails)
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }//end of save token 

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200);
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)
        })

}


// end of the login function 


let logout = (req, res) => {

    AuthModel.remove({ 'userId': req.body.userId }, (err, result) => {
        if (err) {
            logger.error('error while logging out', 'userController', 10)
            let apiResponse = response.generate(true, 'error while logging out', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'logged out sucessfully', 200, result)
            res.send(apiResponse)
        }
    })


} // end of the logout function.


let allUsers = (req, res) => {
    UserModel.find()
    .select("userId firstName lastName")
    .exec((err,result)=>{
        if(err){
            logger.error(true,"userController:allUsers",10);
            let apiResponse = response.generate(true,"error while retrieving users",500,null);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error(true,"userController:allUsers",10);
            let apiResponse = response.generate(true,"error while retrieving users",404,null);
            res.send(apiResponse);
        }else{
            logger.error(false,"userController:allUsers",10);
            let apiResponse = response.generate(false,"all Users",200,result);
            res.send(apiResponse);
        }
    })
}

module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    allUsers: allUsers

}// end exports