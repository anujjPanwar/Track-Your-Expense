import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Asc_icon from "./assets/Asc_Dsc_images.png";

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

function App() {
  const [formData, setFormData] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });
  // const [storedData, setStoredData] = useState()
  const [expence, setGetData] = useState([]);
  const [AscDsc, setAscDsc] = useState(() => {
    const stored = localStorage.getItem("Asc");
    return stored ? JSON.parse(stored).value : true; // default to true if not found
  });
  const ChangeOrder = () => {
    localStorage.setItem("Asc", JSON.stringify({ value: !AscDsc }));
    // localStorage.setItem("formEntries", JSON.stringify(SortedData));
    
    setAscDsc(!AscDsc);
    setGetData(SortedData);
  };
  console.log("ascdsc//////",AscDsc);
  const SortedData = [...expence].sort((a, b) => {
    return AscDsc
      ? Number(a.Amount) - Number(b.Amount)
      : Number(b.Amount) - Number(a.Amount);
  });
  


  useEffect(() => {
    let expenc = JSON.parse(localStorage.getItem("formEntries"));
    if (expenc != null) {
      setGetData(expenc);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const Submit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
    const updatedData = [
      ...existingData,
      { ...formData, id: crypto.randomUUID() },
    ];
    setGetData(updatedData);
    localStorage.setItem("formEntries", JSON.stringify(updatedData));
    // const jsonData = JSON.stringify(formData)
    // localStorage.setItem("expence",jsonData)
  };


  // Handle Delete Category

  let HandleDelete = (e) => {
    let row = e.target.closest("tr");
    const id = row.getAttribute("id");
    localStorage.setItem(
      "formEntries",
      JSON.stringify(
        expence.filter((ele) => {
          return ele.id != id;
        })
      )
    );
    const data = JSON.parse(localStorage.getItem("formEntries"));
    setGetData(data);
  };

  // Filter All Category 
  const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
  const filterCategory = ([...(new Set(existingData.map((val) => (val.Category))))]).map((val_2)=>{
    return <option value={val_2}>{val_2}</option>;
  })
  
  // Handle Filterd Category to print in the table 
  const handelOnChangeCategory = (val) => {
    console.log("handelOnChangeCategory", val.target.value);
    const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
    if (val.target.value == "All Category") {
      setGetData(existingData);
      return;
    } else {
      let filterCategoryData = existingData.filter((item) => {
        return item.Category == val.target.value;
      });
      setGetData(filterCategoryData);
    }
  };

  return (
    <>
      <form className="form" onSubmit={Submit}>
        <h1>Track Your Expense</h1>
        <label htmlFor="Title">Title</label>
        <input type="text" name="Title" id="Title" onChange={handleChange} />
        <label htmlFor="Category">Category</label>
        <select name="Category" onChange={handleChange} id="Category">
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
          <option value="Medicines">Medicines</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Rent">Rent</option>
          <option value="Internet">Internet & Mobile</option>
          <option value="Household">Household Items</option>
          <option value="PersonalCare">Personal Care</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Education">Education</option>
          <option value="DiningOut">Dining Out</option>
          <option value="Fuel">Fuel</option>
          <option value="Misc">Miscellaneous</option>
        </select>

        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          name="Amount"
          id="Amount"
          onChange={handleChange}
        />
        <button id="formButton" type="submit">
          Add
        </button>
      </form>

      <div className="table">
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <select name="filterCategory" onChange={handelOnChangeCategory} id="tableCategory">
                  <option value="All Category">All Category</option>
                  {filterCategory}
                </select>
              </th>
              <th>
                Amount{" "}
                <img
                  onClick={ChangeOrder}
                  id="Asc_icon"
                  src={Asc_icon}
                  alt="icon"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {expence.map((val, index, arr) => {
              return (
                <tr key={val.id} id={val.id}>
                  <td>{val.Title}</td>
                  <td>{val.Category}</td>
                  <td>{val.Amount}</td>
                  <td onClick={HandleDelete} id="delete">
                    Delete
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>Total Amount</td>
              <td></td>
              <td>
                Rs
                {expence.reduce(
                  (total, item) => total + Number(item.Amount),
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
