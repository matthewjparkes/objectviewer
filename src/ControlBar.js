import React from "react";

const ControlBar = ({handleChange}) =>{
   

    const ClickHandler = (e) => {
        console.log(e.target.value);
        handleChange(e.target.value);
    }
    
    return(
        <div className = "absolute bottom-0 right-0 bg-red-200">
            <h3>Controls</h3>
            <input type="checkbox" id="Wireframe" name="Wireframe" value="wireframechoice" onChange={ClickHandler}/>
            <label htmlFor="Wireframe"> Enable Wireframe </label>
        </div>
    )
    
}

export default ControlBar;