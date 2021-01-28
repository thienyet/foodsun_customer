import axiosClient from "./axiosClient";

const DisscussionApi = {
    getAllDiscussion: () => {
        const url = "/discuss/all";
        return axiosClient.get(url);
    },
    getDetailsDiscussion: (id: string) => {
        const url = "/discuss/" + id;
        return axiosClient.get(url);
    },
    approveCV: (params: string) => {
        const url = "/cv/approveCV/" + params;
        return axiosClient.get(url);
    },
    UnapproveCV: (params: string) => {
        const url = "/cv/cancelCV/" + params;
        return axiosClient.get(url);
    },
    DiscussionReply: (params: string) => {
        const url = "/discuss/reply"+ params;
        return axiosClient.get(url);
    }
}

export default DisscussionApi;