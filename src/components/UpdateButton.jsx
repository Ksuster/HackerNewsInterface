import React from 'react';

const UpdateButton = ({onClick}) => {
    return (
        <div
            style={{
                fontFamily: "Agency FB",
                marginBottom: "40px",
                fontSize: "20px",
                position: "fixed",
                bottom: "0",
                right: "0",
                marginRight: "60px",
                backgroundColor: " #ff6600",
                color: "#000",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            Update News
        </div>
    );
};

export default UpdateButton;