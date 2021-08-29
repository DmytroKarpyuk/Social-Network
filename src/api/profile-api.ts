import {PhotosType, ProfileType} from '../types/types';
import {instance, APIResponseType} from './api';

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId).then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status}).then(response => response);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData).then(response => response.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile).then(response => response.data);
    }
};