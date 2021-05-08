import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.userStatus
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                status: this.props.userStatus
            });
        }
    }

    enableEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    disableEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.enableEditMode}><b>Status: </b>{this.props.userStatus}</span>
                    </div>
                    : <div>
                        <input onChange={this.onStatusChange} value={this.state.status} onBlur={this.disableEditMode} autoFocus={true}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;