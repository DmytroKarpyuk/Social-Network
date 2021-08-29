export type PostType = {
    id: number
    postText: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: Array<ContactsType>
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    photos: PhotosType
    status: string | null
    followed: boolean
}