import axiosClient from "./axiosClient";

const authApi = {
    login(username: string, password: string ){
        const url = '/foodsun/login';
        return axiosClient
            .post(url, {
                username,
                password
            })
            .then(response => {
                if (response) {
                    localStorage.setItem("customer", response.data.token);
                }
                return response;
            });
    }
}

export default authApi;