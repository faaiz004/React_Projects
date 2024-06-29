import React from "react";

function Timer(props) {
    return(
      <div>
      <span
        className="bg-yellow-600 h-10 hover:bg-yellow-700 py-2 cursor-pointer "
        onClick={() => {
          props.setShowTimer((prevTimer) => !prevTimer);
        }}
      >
        <span className="text-white font-mono px-2">Timer</span>
      </span>
      {props.showTimer ? (
        <div className="shadow-md flex flex-col items-center gap-4 w-2/6 lg:w-1/5 absolute top-full mt-2 right-2/4 mr-12 bg-white">
          <span className="bg-white py-2 px-4 font-mono text-black p-2 ml-auto mr-8 shadow-lg">
            {props.sliderVal} mins
          </span>
          <input
            type="range"
            min="1"
            max="1440"
            value={props.sliderVal}
            onChange={(e) => props.setSliderVal(e.target.value)}
            className="w-4/5 h-6"
          />
        </div>
      ) : (
        ""
      )}
    </div>
    )
    
  }
  export default React.memo(Timer)