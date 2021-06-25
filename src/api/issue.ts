import { axios } from './index'

function getIssues(params: any) {
    return axios.get('issues', { params: params });
}

function submitIssue(params: any) {
    return axios.post('issues', params);
}

export {
    getIssues,
    submitIssue,
}