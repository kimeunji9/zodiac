import { axios } from './index'

function getIssues() {
    return axios.get('issue');
}

function submitIssue(params: object) {
    return axios.post('issue', params);
}

export {
    getIssues,
    submitIssue,
}