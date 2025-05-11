import React from "react";

export default function Input({typee,name,val,id,handleChange,checkfield,Class,reqVal}) {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>{name}</label>
      <input
        type={typee}
        name={name}
        value={val}
        id={id}
        onChange={handleChange}
      />
      <p className={`${Class} ${name in checkfield ? "visible" : ""}`}>
        {reqVal}
      </p>
    </div>
  );
}
