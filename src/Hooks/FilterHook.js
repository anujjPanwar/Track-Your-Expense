import React from "react";

export function FilterHook(val, data, setGetData) {
  if (val.target.value == "All Category") {
    setGetData(data);
    return;
  } else {
    let filterCategoryData = data.filter((item) => {
      return item.Category == val.target.value;
    });
    setGetData(filterCategoryData);
  }
}
