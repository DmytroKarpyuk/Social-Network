import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    userStatus: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.userStatus);

    useEffect(() => {
        setStatus(props.userStatus);
    }, [props.userStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const disableEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}><b>Status: </b>{props.userStatus}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onChange={onStatusChange} value={status} onBlur={disableEditMode}/>
            </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;