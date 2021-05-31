import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.userStatus);

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

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
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
    )
}

export default ProfileStatusWithHooks;