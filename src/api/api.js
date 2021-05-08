import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '7ff94c5a-c84e-4c38-842c-4cbd86a44ef7'},
    withCredentials: true
});

export const authAPI = {
    loginMe() {
        return instance.get('auth/me');
    }
};

export const profileAPI = {
    getProfile(userId = 16454) {
        return instance.get('profile/' + userId).then(response => response.data);
    },
    getStatus(userId = 16454) {
        return instance.get('profile/status/' + userId).then(response => response.data);
    },
    updateStatus(status) {
        return instance.put('profile/status',  {status}).then(response => response.data);
    }
};

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    }
};

export const followAPI = {
    follow(userId) {
        return instance.post('follow/' + userId).then(response => response.data);
    },
    unFollow(userId) {
        return instance.delete('follow/' + userId).then(response => response.data);
    }
};
