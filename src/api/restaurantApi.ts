import axiosClient from "./axiosClient";

const restaurantApi = {
    getAll: () => {
        const url = '/auth/public';
        return axiosClient.get(url);
    },
    getAllRestaurant: (params: any) => {
        const url = '/customers/restaurants';
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByAdress: (address: any, params: any) => {
        const url = '/customers/restaurants/address/'+ address;
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByName: (name: any, params: any) => {
        const url = '/customers/restaurants/name/'+ name;
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByFoodName: (name: any, params: any) => {
        const url = '/customers/restaurants/foodItems/name/'+ name;
        return axiosClient.get(url, { params });
    },
    getAllFoodItemOfRestaurantByRestaurantID: (id: string, params: any) => {
        const url = '/customers/restaurants/' + id + '/foodItems?';
        return axiosClient.get(url, { params });
    },
    getAllHistory: (id: any, params: any) => {
        const url = '/customers/'+ id+'/orders';
        return axiosClient.get(url, { params });
    },
    getProfileCustomer: (values: any) => {
        const url = '/customers/profile?email=' + values;
        return axiosClient.get(url);
    },
}

export default restaurantApi;