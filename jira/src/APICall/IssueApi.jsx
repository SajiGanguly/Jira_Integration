import axios from 'axios';

async function fetchIssueFromProject(apiurl) {

    try {
        const response = await axios.get(apiurl);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default fetchIssueFromProject;