import React from "react";
const categoryOptions = [
  "Grocery",
  "Clothing",
  "Medicines",
  "Utilities",
  "Transportation",
  "Rent",
  "Internet & Mobile",
  "Household Items",
  "Personal Care",
  "Entertainment",
  "Subscriptions",
  "Education",
  "Dining Out",
  "Fuel",
  "Miscellaneous",
];
export default function Select({
  name,
  handleChange,
  Class,
  checkfield,
  value,
  reqVal
}) {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>{name}</label>
      <select
        name={name}
        onChange={handleChange}
        value={value}
        id={name}
        className="Required"
      >
        <option value="">Select Category</option>
        {categoryOptions.map((val) => {
          return <option value={val}>{val}</option>;
        })}
      </select>
      <p className={`${Class} ${name in checkfield ? "visible" : ""}`}>
        {reqVal}
      </p>
    </div>
  );
}
