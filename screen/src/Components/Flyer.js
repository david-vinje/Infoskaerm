import React from "react";



const Flyer = ({ content }) => {
    return (
        <div className="container-fluid center ">

            <img
                className="rounded p-0 h-100"
                src={content}
            />

        </div>

    )
}
export default Flyer