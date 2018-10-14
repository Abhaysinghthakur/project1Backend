const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const Notification = mongoose.model('Notification');
const Watcher = mongoose.model('Watcher');

let addNotification = (req, res) => {
    if (check.isEmpty(req.body.issueId)) {
        logger.error(true, "notificationController:addNotification", 10);
        let apiResponse = response.generate(true, "issue Id missing in request", 500, null);
        res.send(apiResponse);
    } else {
        let notificationData = new Notification({
            notificationId: shortid.generate(),
            description: req.body.description,
            issueId: req.body.issueId,
            createdOn: time.now()
        });

        notificationData.save((err, result) => {
            if (err) {
                logger.error(true, "notificationController:addNotification", 10);
                let apiResponse = response.generate(true, "error in DB", 500, null);
                res.send(apiResponse);
            } else {
                logger.info(false, "notificationController:addNotification", 0);
                let apiResponse = response.generate(false, "notification created", 200, result);
                res.send(apiResponse);
            }
        })
    }
}

let getNotification = (req, res) => {

    let checkParams = (req, res) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                let apiResponse = response.generate(true, "no userId Present in params", 500, null);
                reject(apiResponse);
            } else {
                resolve(req.params.userId);
            }
        })
    }

    let findWatchList = (userId) => {
        return new Promise((resolve, reject) => {
            Watcher.findOne({ 'userId': userId }, (err, result) => {
                if (err) {
                    let apiResponse = response.generate(true, "error in DB", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(false, "no notification for following user", 404, null);
                    reject(apiResponse);
                } else {
                    let data = result;
                    eventEmitter.emit('markNotificationAsSeen', data);
                    resolve(result);
                }
            })
        })
    }

    let findNotification = (userData) => {
        return new Promise((resolve, reject) => {
            console.log(userData.issueIdArray);
            Notification.find({ 'issueId': { $in: userData.issueIdArray } })
                .limit(10)
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, "error while retrieving notifications", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(false, "no notification for following user", 404, null);
                        reject(apiResponse);
                    } else {
                        let apiResponse = response.generate(false, "notifications", 200, result);
                        resolve(apiResponse);
                    }
                })
        })
    }

    checkParams(req, res)
        .then(findWatchList)
        .then(findNotification)
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((reject) => {
            res.send(reject);
        })


}

let addToWatcherList = (req, res) => {
    if (check.isEmpty(req.params.userId || req.body.issueid)) {
        logger.error(true, "notificationController:addNotification", 10);
        let apiResponse = response.generate(true, "issue Id or user Id missing in request", 500, null);
        res.send(apiResponse);
    } else {
        Watcher.findOne({ 'userId': req.params.userId }, (err, watcherUser) => {
            if (err) {

                let apiResponse = response.generate(true, "DB error", 500, null);
                res.send(apiResponse);

            } else if (check.isEmpty(watcherUser)) {
                let watcherData = new Watcher({
                    userId: req.params.userId
                })

                let issueArray = [req.body.issueId];
                watcherData.issueIdArray = issueArray;

                watcherData.save((err, result2) => {
                    if (err) {
                        let apiResponse = response.generate(true, "error in adding to watcherList", 500, err);
                        res.send(apiResponse);
                    } else {
                        result2.issueId = req.params.issueId;
                        let apiResponse = response.generate(false, "added to watcherlist", 200, result2);
                        res.send(apiResponse);
                    }
                })
            } else {
                Watcher.update({ 'userId': watcherUser.userId, 'issueIdArray': { $ne: req.body.issueId } }, { $push: { issueIdArray: req.body.issueId } }, (err, result3) => {
                    if (err) {
                        let apiResponse = response.generate(true, "error in saving new watcherList", 500, err);
                        res.send(apiResponse);
                    } else {
                        let apiResponse = response.generate(false, "watcher Added", 200, result3);
                        res.send(apiResponse);
                    }
                })

            }
        })
    }
}

let getWatcherlist = (req, res) => {
    if (req.params.userId) {

        Watcher.find({ 'userId': req.params.userId }, (err, result) => {
            if (err) {
                let apiResponse = response.generate(true, "error while finding watcherlist", 500, null);
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, "watcher list not present", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "watcherList", 200, result);
                res.send(apiResponse)
            }
        })
    } else {
        let apiResponse = response.generate(true, "userId missing in params", 500, null);
        res.send(apiResponse)
    }

}

let increaseNotificationCount = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, "no issue passed in params", 500, null);
        res.send(apiResponse);
    } else {
        Watcher.find({ 'issueIdArray': req.params.issueId }, (err, result) => {
            if (err) {
                let apiResponse = response.generate(true, "error while retriving watcherList", 500, null);
                res.send(apiResponse);
            } else {
                console.log(result);
                for (let x of result) {
                    x.notificationCount += 1;
                    Watcher.update({ 'userId': x.userId }, x, (err, result2) => {
                        if (err) {
                            let apiResponse = response.generate(true, `${x}`, 500, null);
                            res.send(apiResponse);
                        }
                    })
                }

                let apiResponse = response.generate(false, 'Notification Updated', 200, null);
                res.send(apiResponse)
            }
        })
    }

}

// let markNotificationAsSeen = (req, res) => {
//     if (check.isEmpty(req.params.userId)) {
//         let apiResponse = response.generate(true, "userId not present in params", 500, null);
//         res.send(apiResponse);
//     } else {
//         let options = {
//             userId: req.params.userId,
//             notificationCount: 0
//         }

//         Watcher.update({ 'userId': req.params.userId }, options, { multi: false }, (err, result) => {
//             if (err) {
//                 let apiResponse = response.generate(true, "error in DB", 500, null);
//                 res.send(apiResponse);
//             } else {
//                 let apiResponse = response.generate(false, "data", 200, result);
//                 res.send(apiResponse);
//             }
//         })
//     }
// }

eventEmitter.on('markNotificationAsSeen', (data) => {
    let options = data;

    options.notificationCount = 0;

    Watcher.update({ 'userId': data.userId }, options, { multi: false }, (err, result) => {
        if (err) {
            logger.error("error while marking notification As seen", "notificationController:eventEmitter", 10);
        } else {
            logger.info("notification set to zero for userId : "+ options.userId, "notificationController:eventEmitter", 0);
        }
    })
})

let removeFromWatchList =(req,res)=>{
    if(check.isEmpty(req.params.userId)&&check.isEmpty(req.body.issueId)){
        let apiResponse = response.generate(true,"userId missing in request",500,null);
        res.send(apiResponse);
    }else{
        Watcher.update({"userId":req.params.userId},{$pull:{issueIdArray:req.body.issueId}},(err,result)=>{
            if(err){
                let apiResponse = response.generate(true,"error Occured while removing from watcherList",500,err);
                res.send(apiResponse);
            }else{
                let apiResponse = response.generate(false,"Issue removed from watchList",200,result);
                res.send(apiResponse);
            }
        })
    }
}

module.exports = {

    addNotification: addNotification,
    getNotification: getNotification,
    addToWatcherList: addToWatcherList,
    getWatcherlist: getWatcherlist,
    increaseNotificationCount: increaseNotificationCount,
    removeFromWatchList:removeFromWatchList
}