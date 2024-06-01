import React from "react";
import { useId } from "react";

function Select({
    options,
    label,
    className='',
    ...props
},ref){
    
    const id = useId()
    return (
        <div className="w-full">
            {label && <label hhtmlFor={id} className=""></label>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-300 w-30 ${className}`}>

                {options.map((option)=>(
                    <option key= {option} value={option}>
                            {option}
                    </option>
                ))}

            </select>
        </div>
    )
}


export default React.forwardRef(Select);