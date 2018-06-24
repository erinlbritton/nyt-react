import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <button type="button" {...props} className="btn btn-xs delete-btn">
  Delete
  </button>
);

export default DeleteBtn;
