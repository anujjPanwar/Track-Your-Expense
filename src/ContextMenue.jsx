import React, { useState } from "react";

export default function ContextMenue({
  ContextMenuePosition,
  setCtxtMenuePosition,
  rowId,
  onclickDelete,
  formData,
  setFormData,
  setSave,
}) {
  const getData = JSON.parse(localStorage.getItem("formEntries"));
  // console.log("****",getData[2].id);

  const onclickEdit = () => {
    console.log("Edit", rowId);
    const editData = getData.filter((val) => {
      return val.id == rowId;
    });
    console.log("editData", editData[0].Title);
    setFormData({
      Title: editData[0].Title,
      Category: editData[0].Category,
      Amount: editData[0].Amount,
    });
    setCtxtMenuePosition({});
    setSave("Save")
  };

  if (!ContextMenuePosition.left) return;
  return (
    <div className="contextMenue" style={ContextMenuePosition}>
      <div id="C1" onClick={onclickEdit}>
        Edit
      </div>
      <div id="C2" onClick={onclickDelete}>
        Delete
      </div>
    </div>
  );
}
