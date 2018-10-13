define({ "api": [
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/issue/assigned/:userId",
    "title": "api for Issue's info that are assigned to this User.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends Issues that are assigned to a specified person.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Issue Found\",\n    \"status\": 200,\n    \"data\": [{\n        \"Issue Data\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "GetApiProjectIssueAssignedUserid"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/issue/readComment/:issueId",
    "title": "api for Comments on an Issue.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends Comments of that Specifiedd Issue.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Comments\",\n    \"status\": 200,\n    \"data\": [{\n        \"Issue Data\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "GetApiProjectIssueReadcommentIssueid"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/issue/search?arg=${arg}",
    "title": "api for searching Issue's.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends Issues which contains the following arguments.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"data present by this search string\",\n    \"status\": 200,\n    \"data\": [{\n        \"Search Data\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "GetApiProjectIssueSearchArgArg"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/issue/view/:issueId",
    "title": "api for Issue's info.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Issue Found\",\n    \"status\": 200,\n    \"data\": {\n        \"Issue Data\"\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "GetApiProjectIssueViewIssueid"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/issue/addComment",
    "title": "api To add comment in an Issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the comment. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the comment. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "by",
            "description": "<p>name of person who is created this comment. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "byID",
            "description": "<p>Id of person who is created this comment. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Comment Created\",\n    \"status\": 200,\n    \"data\": {\n        \"Comment Data\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "PostApiProjectIssueAddcomment"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/issue/create",
    "title": "api for Issue Creation.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the Issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "by",
            "description": "<p>created By. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "byId",
            "description": "<p>Id of person who created the issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignedToName",
            "description": "<p>name of person who is assigned this issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignedToId",
            "description": "<p>Id of person who is assigned this issue. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Issue Created\",\n    \"status\": 200,\n    \"data\": {\n        \"IssueData\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "PostApiProjectIssueCreate"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/issue/edit/:issueId",
    "title": "api for Issue edit.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the Issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignedToName",
            "description": "<p>name of person who is assigned this issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignedToId",
            "description": "<p>Id of person who is assigned this issue. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Issue updated\",\n    \"status\": 200,\n    \"data\": {\n        \"Updated Data\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "PostApiProjectIssueEditIssueid"
  },
  {
    "group": "Issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/issue/filter",
    "title": "api To filter Issue's by sending an array of issues.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueIdArray",
            "description": "<p>issueIdArray of the issues. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"data present\",\n    \"status\": 200,\n    \"data\": {\n        \"Issues Data\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issues",
    "name": "PostApiProjectIssueFilter"
  },
  {
    "group": "Notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/getwatcherlist/:userId",
    "title": "api To get list of notifications and issue watching by the given user.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends unseen notification count and issue's list which are being watched by the following user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"watcherList\",\n    \"status\": 200,\n    \"data\": [{\n        \"watcherList Data\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Notification",
    "name": "GetApiProjectGetwatcherlistUserid"
  },
  {
    "group": "Notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/notify/get/:userId",
    "title": "api for Notification of the given user.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends notification which are of the following UserId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"notifications\",\n    \"status\": 200,\n    \"data\": [{\n        \"notification Data\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Notification",
    "name": "GetApiProjectNotifyGetUserid"
  },
  {
    "group": "Notification",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/notify/addWatcher/:userId",
    "title": "api To add an issue in watcherList of the given user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueIdA of the issues. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Watcher Added\",\n    \"status\": 200,\n    \"data\": {\n        \"Watcher Data\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Notification",
    "name": "PostApiProjectNotifyAddwatcherUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/project/users/allUsers",
    "title": "api for user's info.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Found\",\n    \"status\": 200,\n    \"data\": [{\n        \"_id\": \"5b9a7873d4ccf325ca33db13\",\n        \"__v\": 0,\n        \"createdOn\": \"2018-09-13T14:47:15.000Z\",\n        \"mobileNumber\": 0,\n        \"email\": \"something@something2.com\",\n        \"password\": \"$2b$10$xZntMG0HDj88ckuG5wT9i.gXzG6fHveghS6Pfcry7twBykN4qQ.t2\",\n        \"lastName\": \"Thakur\",\n        \"firstName\": \"abhay\",\n        \"userId\": \"IRDnDxxCR\"\n    }]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiProjectUsersAllusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkZJankwYjctZiIsImlhdCI6MTUzNjg1MDExMTU5MiwiZXhwIjoxNTM2OTM2NTExLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJhc3NpZ25tZW50MTEiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MCwiZW1haWwiOiJzb21ldGhpbmdAc29tZXRoaW5nMi5jb20iLCJsYXN0TmFtZSI6IlRoYWt1ciIsImZpcnN0TmFtZSI6ImFiaGF5IiwidXNlcklkIjoiSVJEbkR4eENSIn19.EczlvMZoN6vZNDqgDpXs1oEeax4orF33uiZTIRQCY9Y\",\n        \"userDetails\": {\n            \"mobileNumber\": 0,\n            \"email\": \"something@something2.com\",\n            \"lastName\": \"Thakur\",\n            \"firstName\": \"abhay\",\n            \"userId\": \"IRDnDxxCR\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiProjectUsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/users/logout",
    "title": "api for user logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"logged out sucessfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiProjectUsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/project/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile",
            "description": "<p>moobile of the user. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5b9a7873d4ccf325ca33db13\",\n        \"createdOn\": \"2018-09-13T14:47:15.000Z\",\n        \"mobileNumber\": 0,\n        \"email\": \"something@something2.com\",\n        \"lastName\": \"Thakur\",\n        \"firstName\": \"abhay\",\n        \"userId\": \"IRDnDxxCR\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiProjectUsersSignup"
  }
] });
