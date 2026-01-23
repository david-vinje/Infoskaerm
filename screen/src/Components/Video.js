import React from "react";

const Video = ({ onEnded, content }) => {
    return (
        <div className="container-fluid center d-flex flex-column">
            <video
                style={{ boxShadow: "0px 0px 20px 5px rgba(75, 61, 61, 0.3)" }}
                className="rounded my-2 h-100"
                src={content}
                autoPlay
                muted
                onEnded={onEnded}
                >
            </video>
        </div>

    )
}
export default Video