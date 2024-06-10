import IssueGrid from './Component/IssueGrid'
import { AppBar, Toolbar, Typography } from '@mui/material';


function App() {

  const footerStyle = {
    backgroundColor: '#226cf5',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
};

  const url = import.meta.env.VITE_ISSUE_API_URL;
  console.log('URL:', url);
  return (
    <>
    <AppBar position="sticky">
        <Toolbar >
          <Typography variant="h6">
            Jira Issue Tracker 
          </Typography>
        </Toolbar>
      </AppBar>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
        }}
      >
      <IssueGrid apiurl={url} />
      </div>

      <footer style={footerStyle}>
      <p>&copy; 2024  All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
