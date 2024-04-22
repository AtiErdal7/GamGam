import React from 'react';
import ProfileBar from "./ProfileBar";
import ProfileDetails from "./ProfileDetails";

function ProfilePage() {
    return (
        <div>
            <div>
                <ProfileBar></ProfileBar>
            </div>
            <div>
                <ProfileDetails></ProfileDetails>
            </div>

        </div>

    );
}

export default ProfilePage;