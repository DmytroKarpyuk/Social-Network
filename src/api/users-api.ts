import {GetItemsType, instance, APIResponseType} from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number): Promise<GetItemsType> {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId: number): Promise<APIResponseType> {
        return instance.post<APIResponseType>('follow/' + userId).then(response => response.data);
    },
    unFollow(userId: number): Promise<APIResponseType> {
        return instance.delete('follow/' + userId).then(response => response.data) as Promise<APIResponseType>;
    }
};
