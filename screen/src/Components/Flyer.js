import React from "react";



const Flyer = ({ content }) => {
    return (
        <div className="container-fluid center ">

            <img
                className="rounded p-0 h-100"
                src={content[0]}
            />
            <img
                className="rounded p-0 h-100"
                src={content[1]}
            />
            <img
                className="rounded p-0 h-100"
                src={content[2]}
            />
            <img
                className="rounded p-0 h-100"
                src={content[3]}
            />

        </div>

    )
}
export default Flyer