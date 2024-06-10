const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/getIssues', async (req, res) => {
    require('dotenv').config();
    const apiUrl = process.env.JIRA_API_URL;
    const auth = process.env.JIRA_API_AUTH;
    const cookie = process.env.JIRA_API_COOKIE;

    let responseObject = [];
    try{
        console.log(process.env.JIRA_API_URL);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.JIRA_API_URL,
            headers: {
                'Accept': 'application/json',
                'Authorization': "Basic "+auth,
                'Cookie': cookie
            }
        };

          const response = await axios.get(apiUrl,config);
          console.log(response);
          let issues = response.data.issues;
          issues.map((issue) => {
              let issueObj = {
                  issueId: issue.id,
                  issueKey: issue.key,
                  issueName: issue.fields.summary,
                  issueDescription: issue.fields.description,
                  issueType: issue.fields.issuetype.name,
                  issueStatus: {
                      statusId: issue.fields.status.id,
                      statusName: issue.fields.status.name,
                      statusCategory: {
                          categoryId: issue.fields.status.statusCategory.id,
                          categoryKey: issue.fields.status.statusCategory.key,
                          categoryName: issue.fields.status.statusCategory.name
                      }
                  },
                  issuePriority: issue.fields.priority.name,
                    issueAssignee: issue.fields.assignee ? {
                        assigneeId: issue.fields.assignee.id,
                        assigneeName: issue.fields.assignee.displayName,
                        assigneeEmail: issue.fields.assignee.emailAddress,
                        assigneeAvatar: {
                            url: issue.fields.assignee.avatarUrls['16x16']
                        },
                        active: issue.fields.assignee.active
                    } : null,
                  issueCreated: issue.fields.created,
                  issueUpdated: issue.fields.updated,
                  issueDueDate: issue.fields.duedate,
                  issueResolutionDate: issue.fields.resolutiondate,
                  issueParent: issue.fields.parent ?{
                      parentId: issue.fields.parent.id,
                      parentName: issue.fields.parent.key,
                      parentType: issue.fields.parent.name
                  } : null,
                  timeSpent: issue.fields.timespent,
                  project: {
                      projectId: issue.fields.project.id,
                      projectName: issue.fields.project.name,
                      avatarUrl: {
                          url: issue.fields.project.avatarUrls['16x16']
                      },
                      projectKey: issue.fields.project.key,
                      projectType: issue.fields.project.projectTypeKey
                  },
                  issueCreator: {
                      creatorName: issue.fields.creator.displayName,
                      creatorEmail: issue.fields.creator.emailAddress,
                      creatorAvatar: {
                          url: issue.fields.creator.avatarUrls['16x16']
                      },
                      active: issue.fields.creator.active
                  },
                  issueReporter: {
                      reporterName: issue.fields.reporter.displayName,
                      reporterEmail: issue.fields.reporter.emailAddress,
                      reporterAvatar: {
                          url: issue.fields.reporter.avatarUrls['16x16']
                      },
                      active: issue.fields.reporter.active
                  },
                  issueProgress: {
                      progress: issue.fields.progress.progress,
                      progressTotal: issue.fields.progress.total
                  }
              }
              responseObject.push(issueObj);
          });

          res.send(responseObject);
    }catch(err){
        console.log(err);
        res.status(500).send('Error fetching issues from Jira');
    }

});

module.exports = router;