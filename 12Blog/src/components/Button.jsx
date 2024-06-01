import React from "react";

function Button({
    children,
    type= "text",
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className ='',
    ...props
}){
    return(
        <button
         type = {type}
         className={`${bgColor} ${textColor} ${className} w-20 rounded-lg p-2 text-lg`}
         >
            {children}
        </button>
    )
}

export default Button;