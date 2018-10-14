const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const events = require('events');
const eventEmitter = new events.EventEmitter();


const Issue = mongoose.model('Issue');
const Comment = mongoose.model('Comment');
const Notification = mongoose.model('Notification');
const Watcher = mongoose.model('Watcher');

let createIssue = (req, res) => {

    let issueData = new Issue({
        issueId: shortid.generate(),
        status: req.body.status || "Backlog",
        title: req.body.title,
        description: req.body.description || "",
        by: req.body.by,
        byId: req.body.byId,
        assignedToName: req.body.assignedToName,
        assignedToId: req.body.assignedToId,
        createdOn: time.now()
    })

    issueData.save((err, issue) => {
        if (err) {
            let apiResponse = response.generate(true, "error in creating new Issue", 500, null);
            res.send(apiResponse)
        } else if (issue) {

            let data2 = {
                issueId: issueData.issueId,
                userId: req.body.byId
            }
            eventEmitter.emit('addToWatcherList', data2);
            let apiResponse = response.generate(false, "new Issue created", 200, issue);
            res.send(apiResponse)
        }
    })
}

let editIssue = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {
        logger.error(true, "issueController:editIssue", 5);
        let apiResponse = response.generate(true, "issue Id missing in params", 500, null);
        res.send(apiResponse);
    } else {
        let options = req.body;
        logger.error(false, options, 5);
        Issue.update({ 'issueId': req.params.issueId }, options, { multi: true }, (err, result) => {
            if (err) {
                logger.error(true, "issueController:editIssue", 10);
                let apiResponse = response.generate(true, "error while updating issue", 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error(true, "issueController:editIssue", 5);
                let apiResponse = response.generate(true, "issue not present", 404, null);
                res.send(apiResponse);
            } else {
                let data = {
                    issueId: req.params.issueId,
                    description: 'Someone edited a issue you are following'
                }
                eventEmitter.emit('saveNotification', data);

                let data2 = {
                    issueId: req.params.issueId,
                    userId: req.body.userId
                }
                eventEmitter.emit('addToWatcherList', data2);

                logger.info(false, "issueController:editIssue", 0);
                let apiResponse = response.generate(false, "issue updated", 200, result);
                res.send(apiResponse);
            }
        })
    }

}

let viewIssue = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {
        logger.error(true, "issueController:viewIssue", 5);
        let apiResponse = response.generate(true, "issue Id missing in params", 500, null);
        res.send(apiResponse);
    } else {
        Issue.findOne({ 'issueId': req.params.issueId }, (err, result) => {
            if (err) {
                logger.error(true, "issueController:viewIssue", 10);
                let apiResponse = response.generate(true, "error in DB", 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error(true, "issueController:viewIssue", 5);
                let apiResponse = response.generate(true, "Id not found in DB", 404, null);
                res.send(apiResponse);
            } else {
                logger.info(false, "issueController:viewIssue", 0);
                let apiResponse = response.generate(false, "issue found", 200, result);
                res.send(apiResponse);
            }
        })
    }
}


let assignedIssue = (req, res) => {

    if (check.isEmpty(req.params.userId)) {
        logger.error(true, "issueController:assignedIssue", 0);
        let apiResponse = response.generate(true, "user Id missing in params", 500, result);
        res.send(apiResponse);
    } else {
        Issue.find({ 'assignedToId': req.params.userId })
            .select('-_id -__v')
            .sort('-createdOn')
            .skip(parseInt(req.query.skip) || 0)
            .lean()
            .limit(40)
            .exec((err, result) => {
                if (err) {
                    logger.error(true, "issueController:assignedIssue", 10);
                    let apiResponse = response.generate(true, "DB error", 500, result);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error(true, "issueController:assignedIssue", 5);
                    let apiResponse = response.generate(true, "No assigned Issue's for this user", 404, result);
                    res.send(apiResponse);
                } else {
                    logger.info(false, "issueController:assignedIssue", 0);
                    let apiResponse = response.generate(false, "Issue's for this user", 200, result);
                    res.send(apiResponse);
                }
            })
    }

}

let addComment = (req, res) => {

    let newComment = new Comment({
        commentId: shortid.generate(),
        issueId: req.body.issueId,
        description: req.body.description,
        by: req.body.by,
        byId: req.body.byId,
        createdOn: time.now()
    })

    newComment.save((err, result) => {
        if (err) {
            logger.error(true, "issueController:addComment", 10);
            let apiResponse = response.generate(true, "DB error in creating Comment", 500, null)
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            logger.error(true, "issueController:addComment", 5);
            let apiResponse = response.generate(true, "comment not stored", 404, null)
            res.send(apiResponse);
        } else {
            let data = {
                issueId: req.body.issueId,
                description: 'Someone commented on a issue you are following'
            }
            eventEmitter.emit('saveNotification', data);

            let data2 = {
                issueId: req.body.issueId,
                userId: req.body.byId
            }
            eventEmitter.emit('addToWatcherList', data2);

            logger.info(false, "issueController:addComment", 0);
            let apiResponse = response.generate(false, "comment created", 200, result)
            res.send(apiResponse);
        }
    })

}

// let allIssues = (req, res) => {
//     Issue.find((err, result) => {
//         if (err) {
//             let apiResponse = response.generate(true, "some error occured", 500, null);
//             res.send(apiResponse);
//         } else {
//             let apiResponse = response.generate(false, "all Issues", 200, result);
//             res.send(apiResponse);
//         }
//     })
// }

let readComment = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, "issueId missing", 500, null);
        res.send(apiResponse);
    } else {
        Comment.find({ 'issueId': req.params.issueId }, (err, result) => {
            if (err) {
                let apiResponse = response.generate(true, "error while retrieving comment", 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, "no Comment present By this Id", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "Comments", 200, result);
                res.send(apiResponse);
            }
        })
    }

}

let searchIssue = (req, res) => {
    if (check.isEmpty(req.query.arg)) {
        logger.error(true, "issueController:SearchIssue", 10);
        let apiResponse = response.generate(true, "No argument entered for search", 500, null);
        res.send(apiResponse);
    } else {
        Issue.find({ $text: { $search: req.query.arg } })
            .limit(10)
            .skip(parseInt(req.query.skip))
            .exec((err, result) => {
                if (err) {
                    logger.error(true, "issueController:SearchIssue", 10);
                    let apiResponse = response.generate(true, "error while retrieving data", 500, null);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error(true, "issueController:SearchIssue", 5);
                    let apiResponse = response.generate(true, "no data present by this search string", 404, null);
                    res.send(apiResponse);
                } else {
                    logger.info(false, "issueController:SearchIssue", 0);
                    let apiResponse = response.generate(false, "data present by this search string", 200, result);
                    res.send(apiResponse);
                }
            })
    }
}

let filterIssue = (req, res) => {
    if (check.isEmpty(req.body.issueIdArray)) {
        logger.error(true, "issueController:filterIssue", 10);
        let apiResponse = response.generate(true, "No status entered for search", 500, null);
        res.send(apiResponse);
    } else {
        let tempArray = req.body.issueIdArray.split(",");
        Issue.find({ 'issueId': { $in: tempArray}})
            .select('-_id -__v')
            .sort('createdOn')
            .exec((err, result) => {
                if (err) {
                    logger.error(true, "issueController:filterIssue", 10);
                    let apiResponse = response.generate(true, "error while retrieving data", 500, null);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error(true, "issueController:filterIssue", 5);
                    console.log(req.body.issueIdArray);
                    let apiResponse = response.generate(true, "no data present by this status", 404, null);
                    res.send(apiResponse);
                } else {
                    logger.info(false, "issueController:filterIssue", 0);
                    let apiResponse = response.generate(false, "data present ", 200, result);
                    res.send(apiResponse);
                }
            })
    }
}

eventEmitter.on('saveNotification', (data) => {
    let notificationData = new Notification({
        notificationId: shortid.generate(),
        description: data.description,
        issueId: data.issueId,
        createdOn: time.now()
    });

    notificationData.save((err, result) => {
        if (err) {
            logger.error(true, "notificationController:addNotification", 10);
        } else {
            eventEmitter.emit('increaseNotificationCount', data.issueId);
            logger.info("notifications Added", "notificationController:addNotification", 0);
        }
    })
});


eventEmitter.on('addToWatcherList', (data) => {
    Watcher.findOne({ 'userId': data.userId }, (err, watcherUser) => {
        if (err) {
            logger.error("error in Db while finding watcher list" + err, "eventEmitter:addToWatchList", 10);
        } else if (check.isEmpty(watcherUser)) {
            let watcherData = new Watcher({
                userId: data.userId
            })

            let issueArray = [data.issueId];
            watcherData.issueIdArray = issueArray;

            watcherData.save((err, result2) => {
                if (err) {
                    logger.error("error in Db while saving watcher list", "eventEmitter:addToWatchList", 10);
                } else {
                    logger.info("New watchlist created for user" + data.userId, "eventEmitter:addToWatchList", 10);
                }
            })
        } else {
            Watcher.update({'userId': watcherUser.userId,'issueIdArray':{$ne:data.issueId}}, { $push: { issueIdArray: data.issueId } }, (err, result3) => {
                if (err) {
                    logger.error("error in Db while updating watcher list", "eventEmitter:addToWatchList", 10);
                } else {
                    logger.info("watchlist updated for user" + data.userId, "eventEmitter:addToWatchList", 10);
                }
            })

        }
    })
})


eventEmitter.on('increaseNotificationCount', (issueId) => {
    Watcher.find({ 'issueIdArray': issueId }, (err, result) => {
        if (err) {
            logger.error(err,"eventEmitter:increaseNotificationCount",10);
        } else {
            console.log(result);
            for (let x of result) {
                x.notificationCount += 1;
                Watcher.update({ 'userId': x.userId }, x, (err, result2) => {
                    if (err) {
                        logger.error(err,"eventEmitter:increaseNotificationCount:insideForLoop",10);
                    }
                })
            }
            logger.info('notificationCountIncreased',"eventEmitter:increaseNotificationCount",10);
        }
    })
})

module.exports = {
    createIssue: createIssue,
    editIssue: editIssue,
    viewIssue: viewIssue,
    assignedIssue: assignedIssue,
    addComment: addComment,
    readComment: readComment,
    searchIssue: searchIssue,
    filterIssue: filterIssue
}