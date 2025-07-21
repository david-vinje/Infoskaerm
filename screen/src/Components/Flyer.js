import React from "react";



const Flyer = ({ content }) => {
    return (
        <div className="container-fluid center d-flex flex-column ">
            {content.map((flyer, index) => (
            <img
                key={index}
                style={{boxShadow: "0px 0px 20px 5px rgba(75, 61, 61, 0.3)"}}
                className="rounded my-2 h-75 w-85"
                src={flyer}
            />
            ))}



        </div>

    )
}
export default Flyer