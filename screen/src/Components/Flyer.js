import React from "react";



const Flyer = ({content}) => {
  return (
      <div className="container-fluid">
        <div className="">
        <img
        className="rounded p-0 h-75"
        src={content}
        />
        </div>
      </div>
    
  )
}
export default Flyer