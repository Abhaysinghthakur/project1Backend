const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const issueController = require("./../../app/controllers/issueController");
const notificationController = require("./../controllers/notificationController");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
    // defining routes.

    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {post} /api/project/users/signup api for user signup.
         *
         * @apiParam {string} email email of the user. (body params) (required)
         * @apiParam {string} password password of the user. (body params) (required)
         * @apiParam {string} firstName firstName of the user. (body params)
         * @apiParam {string} lastName lastName of the user. (body params) 
         * @apiParam {string} mobile moobile of the user. (body params)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
             {
                "error": false,
                "message": "User Created",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "5b9a7873d4ccf325ca33db13",
                    "createdOn": "2018-09-13T14:47:15.000Z",
                    "mobileNumber": 0,
                    "email": "something@something2.com",
                    "lastName": "Thakur",
                    "firstName": "abhay",
                    "userId": "IRDnDxxCR"
                }
            }
        */
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/project/users/login api for user login.
    *
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "Login Successful",
           "status": 200,
           "data": {
               "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkZJankwYjctZiIsImlhdCI6MTUzNjg1MDExMTU5MiwiZXhwIjoxNTM2OTM2NTExLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJhc3NpZ25tZW50MTEiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MCwiZW1haWwiOiJzb21ldGhpbmdAc29tZXRoaW5nMi5jb20iLCJsYXN0TmFtZSI6IlRoYWt1ciIsImZpcnN0TmFtZSI6ImFiaGF5IiwidXNlcklkIjoiSVJEbkR4eENSIn19.EczlvMZoN6vZNDqgDpXs1oEeax4orF33uiZTIRQCY9Y",
               "userDetails": {
                   "mobileNumber": 0,
                   "email": "something@something2.com",
                   "lastName": "Thakur",
                   "firstName": "abhay",
                   "userId": "IRDnDxxCR"
               }
           }
       }
   */

    app.post(`${baseUrl}/logout`, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/project/users/logout api for user logout.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "logged out sucessfully",
            "status": 200,
            "data": {
                "n": 0,
                "ok": 1
            }
        }
    */
    app.get(`${baseUrl}/allUsers`, userController.allUsers);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/project/users/allUsers api for user's info.
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Found",
            "status": 200,
            "data": [{
                "_id": "5b9a7873d4ccf325ca33db13",
                "__v": 0,
                "createdOn": "2018-09-13T14:47:15.000Z",
                "mobileNumber": 0,
                "email": "something@something2.com",
                "password": "$2b$10$xZntMG0HDj88ckuG5wT9i.gXzG6fHveghS6Pfcry7twBykN4qQ.t2",
                "lastName": "Thakur",
                "firstName": "abhay",
                "userId": "IRDnDxxCR"
            }]
    */

    app.post(`${appConfig.apiVersion}/issue/create`, issueController.createIssue);
    /**
        * @apiGroup Issues
        * @apiVersion  1.0.0
        * @api {post} /api/project/issue/create api for Issue Creation.
        *
        * @apiParam {string} title title of the Issue. (body params) (required)
        * @apiParam {string} description description of the Issue. (body params) (required)
        * @apiParam {string} status status of the Issue. (body params)
        * @apiParam {string} by created By. (body params) 
        * @apiParam {string} byId Id of person who created the issue. (body params)
        * @apiParam {string} assignedToName name of person who is assigned this issue. (body params)
        * @apiParam {string} assignedToId Id of person who is assigned this issue. (body params)
        *
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
            {
               "error": false,
               "message": "Issue Created",
               "status": 200,
               "data": {
                   "IssueData"
               }
           }
       */

    app.post(`${appConfig.apiVersion}/issue/edit/:issueId`, issueController.editIssue);
    /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {post} /api/project/issue/edit/:issueId api for Issue edit.
         *
         * @apiParam {string} title title of the Issue. (body params) (required)
         * @apiParam {string} description description of the Issue. (body params) (required)
         * @apiParam {string} status status of the Issue. (body params)
         * @apiParam {string} assignedToName name of person who is assigned this issue. (body params)
         * @apiParam {string} assignedToId Id of person who is assigned this issue. (body params)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
             {
                "error": false,
                "message": "Issue updated",
                "status": 200,
                "data": {
                    "Updated Data"
                }
            }
    */

    app.get(`${appConfig.apiVersion}/issue/view/:issueId`, issueController.viewIssue);

    /**
    * @apiGroup Issues
    * @apiVersion  1.0.0
    * @api {get} /api/project/issue/view/:issueId api for Issue's info.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Issue Found",
        "status": 200,
        "data": {
            "Issue Data"
        }
    */

    app.get(`${appConfig.apiVersion}/issue/assigned/:userId`, issueController.assignedIssue);
    /**
    * @apiGroup Issues
    * @apiVersion  1.0.0
    * @api {get} /api/project/issue/assigned/:userId api for Issue's info that are assigned to this User.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * sends Issues that are assigned to a specified person.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Issue Found",
        "status": 200,
        "data": [{
            "Issue Data"
        }]
    */

    app.post(`${appConfig.apiVersion}/issue/addComment`, issueController.addComment);
    /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {post} /api/project/issue/addComment api To add comment in an Issue.
         *
         * @apiParam {string} issueId issueId of the comment. (body params) (required)
         * @apiParam {string} description description of the comment. (body params) (required)
         * @apiParam {string} by name of person who is created this comment. (body params)
         * @apiParam {string} byID Id of person who is created this comment. (body params)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
             {
                "error": false,
                "message": "Comment Created",
                "status": 200,
                "data": {
                    "Comment Data"
                }
            }
    */

    app.get(`${appConfig.apiVersion}/issue/readComment/:issueId`, issueController.readComment);

    /**
    * @apiGroup Issues
    * @apiVersion  1.0.0
    * @api {get} /api/project/issue/readComment/:issueId api for Comments on an Issue.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * sends Comments of that Specifiedd Issue.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Comments",
        "status": 200,
        "data": [{
            "Issue Data"
        }]
    */

    app.get(`${appConfig.apiVersion}/issue/search`, issueController.searchIssue);
    /**
    * @apiGroup Issues
    * @apiVersion  1.0.0
    * @api {get} /api/project/issue/search?arg=${arg} api for searching Issue's.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * sends Issues which contains the following arguments.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "data present by this search string",
        "status": 200,
        "data": [{
            "Search Data"
        }]
    */
    app.post(`${appConfig.apiVersion}/issue/filter`, issueController.filterIssue);
    /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {post} /api/project/issue/filter api To filter Issue's by sending an array of issues.
         *
         * @apiParam {string} issueIdArray issueIdArray of the issues. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
             {
                "error": false,
                "message": "data present",
                "status": 200,
                "data": {
                    "Issues Data"
                }
            }
    */

    app.get(`${appConfig.apiVersion}/notify/get/:userId`, notificationController.getNotification);
    /**
    * @apiGroup Notification
    * @apiVersion  1.0.0
    * @api {get} /api/project/notify/get/:userId api for Notification of the given user.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * sends notification which are of the following UserId.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "notifications",
        "status": 200,
        "data": [{
            "notification Data"
        }]
    */

    app.post(`${appConfig.apiVersion}/notify/addWatcher/:userId`, notificationController.addToWatcherList)
    /**
     * @apiGroup Notification
     * @apiVersion  1.0.0
     * @api {post} /api/project/notify/addWatcher/:userId api To add an issue in watcherList of the given user.
     *
     * @apiParam {string} issueId issueIdA of the issues. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Watcher Added",
            "status": 200,
            "data": {
                "Watcher Data"
            }
        }
*/

    app.get(`${appConfig.apiVersion}/getwatcherlist/:userId`, notificationController.getWatcherlist);
    /**
    * @apiGroup Notification
    * @apiVersion  1.0.0
    * @api {get} /api/project/getwatcherlist/:userId api To get list of notifications and issue watching by the given user.
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * sends unseen notification count and issue's list which are being watched by the following user.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "watcherList",
        "status": 200,
        "data": [{
            "watcherList Data"
        }]
    */


}
