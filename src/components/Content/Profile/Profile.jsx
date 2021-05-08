import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = props => {
    return (
        <div>
            <ProfileInfo userProfile={props.userProfile} userStatus={props.userStatus} updateStatus={props.updateStatus}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;