import axiosClient from "./axiosClient";

export const accountApi = {
    getAccountStudent: () => {
        const url = "/accounts/getAllStudentProfile";
        return axiosClient.get(url);
    },
    getAccountStudentId: (id: string) => {
        const url = "/accounts/getStudentProfile/" + id;
        return axiosClient.get(url);
    },
    getAccountTeacher: () => {
        const url = "/accounts/";
        return axiosClient.get(url);
    },
    getAccountCompany: () => {
        const url = "/accounts/getAllCompanyProfile";
        return axiosClient.get(url);
    },
    getPage: (params: any) => {
        const url = "/accounts/sbp";
        return axiosClient.get(url, {params})
    },
    createAccount: (params: any) => {
        const url = "/accounts/create";
        return axiosClient.post(url, params);
    },
    deleteAccount: (params: any) => {
        const url = "/accounts/delete";
        return axiosClient.delete(url, {params})
    },
    afterLogin: () =>{
        const url = '/afterLogin/';
        return axiosClient.get(url);
    },
    logout: () => {
        const url = "/auth/logoutWeb";
        return axiosClient.get(url);
    }
}
