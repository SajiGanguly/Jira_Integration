# Jira_Integration
Project to call Jira cloud API to get and display issues

To run the backend Node.js application
1) Navigate to the project root directory.
2) Open terminal.
3) Run npm install in the root directory.
4) Place .env file with your API_URL, AUTH_TOKEN(base64 coded of {username:authtoken}), API_COOKIE.
5) Run node server.js in the root folder.

To run the frontend application
1) Navigate to the project root directory.
2) Run npm install in the root directory.
3) Place your .env file with the url to contact your node.js application( ex: http://localhost:8080/user/getIssues)
4) Start the server by running npm run dev in the root directory,
