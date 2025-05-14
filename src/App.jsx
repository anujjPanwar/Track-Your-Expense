import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Asc_icon from "./assets/Asc_Dsc_images.png";
import Input from "./Input";
import Select from "./Select";
import { FilterHook } from "./Hooks/FilterHook";
import ContextMenue from "./ContextMenue";

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
  const [ContextMenuePosition, setCtxtMenuePosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [Save, setSave] = useState("");

  const [formData, setFormData] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });
  // const [storedData, setStoredData] = useState()
  const [expence, setGetData] = useState([]);
  const [checkfield, setfield] = useState({});
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
    setfield({});
  };

  const ValidateError = {
    Title: [
      { Required: "true", message: "Title is Required" },
      { minlength: "5", message: "Title length should be at least 5" },
    ],
    Category: [{ Required: "true", message: "Category is Required" }],
    Amount: [{ Required: "true", message: "Amount is Required" }],
  };

  // Validate field
  const Validate = (data) => {
    const fild = {};
    // if (!data.Title) {
    //   fild["Title"] = "Tittle is Required";
    // }
    // if (!data.Category) {
    //   fild["Category"] = "Tittle is Category";
    // }
    // if (!data.Amount) {
    //   fild["Amount"] = "Amount is Required";
    // }
    Object.entries(formData).forEach(([key, value]) => {
      ValidateError[key].some((rule) => {
        console.log(rule);
        if (rule.Required && !value) {
          fild[key] = rule.message;
          return true;
        }
        if (rule.minlength && value.length < 3) {
          fild[key] = rule.message;
        }
      });
    });
    setfield(fild);
    return Object.keys(fild);
  };

  const Submit = (e) => {
    e.preventDefault();
    const required = Validate(formData);
    console.log("formdata", formData);
    if (required.length) return;

    const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
    const updatedData = [
      ...existingData,
      { ...formData, id: crypto.randomUUID() },
    ];
    setGetData(updatedData);
    localStorage.setItem("formEntries", JSON.stringify(updatedData));
    setFormData({
      Title: "",
      Category: "",
      Amount: "",
    });

    console.log("formdata", formData);
  };

  // Handle Delete Category

  let HandleDelete = (e) => {
    let row = e.target.closest("tr");
    const id = row?.getAttribute("id") || rowId;
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
    setCtxtMenuePosition({});
  };

  // Filter All Category
  const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
  const filterCategory = [
    ...new Set(existingData.map((val) => val.Category)),
  ].map((val_2) => {
    return <option value={val_2}>{val_2}</option>;
  });

  // Handle Filterd Category to print in the table
  const handelOnChangeCategory = (val) => {
    const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];
    FilterHook(val, existingData, setGetData);
    // if (val.target.value == "All Category") {
    //   setGetData(existingData);
    //   return;
    // } else {
    //   let filterCategoryData = existingData.filter((item) => {
    //     return item.Category == val.target.value;
    //   });
    //   setGetData(filterCategoryData);
    // }
  };

  return (
    <>
      <ContextMenue
        ContextMenuePosition={ContextMenuePosition}
        setCtxtMenuePosition={setCtxtMenuePosition}
        onclickDelete={HandleDelete}
        rowId={rowId}
        formData={formData}
        setFormData={setFormData}
        setSave={setSave}
      />
      <form className="form" onSubmit={Submit}>
        <h1>Track Your Expense</h1>
        <Input
          id="Title"
          val={formData.Title}
          handleChange={handleChange}
          checkfield={checkfield}
          name="Title"
          typee="text"
          Class="Req"
          reqVal={checkfield.Title}
        />
        <Select
          name="Category"
          value={formData.Category}
          handleChange={handleChange}
          checkfield={checkfield}
          Class="Req"
          reqVal={checkfield.Category}
        />
        <Input
          id="Amount"
          val={formData.Amount}
          handleChange={handleChange}
          checkfield={checkfield}
          name="Amount"
          typee="number"
          Class="Req"
          reqVal={checkfield.Amount}
        />
        <button id="formButton" type="submit">
          {Save == "" ? "Add" : "Save"}
        </button>
      </form>

      <div className="table">
        <table
          border="1"
          onClick={() => {
            setCtxtMenuePosition({});
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <select
                  name="filterCategory"
                  onChange={handelOnChangeCategory}
                  id="tableCategory"
                >
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
                <tr
                  key={val.id}
                  id={val.id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setCtxtMenuePosition({
                      left: `${e.clientX + 20}px`,
                      top: `${e.clientY}px`,
                    });
                    setRowId(val.id);
                  }}
                >
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
