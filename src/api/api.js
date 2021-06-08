import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '7ff94c5a-c84e-4c38-842c-4cbd86a44ef7'},
    withCredentials: true
});

export const authAPI = {
    getMe() {
        return instance.get('auth/me');
    },
    logIn(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logOut() {
        return instance.delete('auth/login');
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId).then(response => response.data);
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId).then(response => response.data);
    },
    updateStatus(status) {
        return instance.put('profile/status', {status}).then(response => response.data);
    }
};

export const usersAPI = {
    getUsers(currentPage, pageSize) {
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
