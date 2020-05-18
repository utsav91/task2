import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMinimumBills, removeBill, minimumBillsLength } from "./dashboardSlice";

export const MinimumBills = () => {
  const [budget, setBudget] = useState(0);
  const n = useSelector(minimumBillsLength);
  const dispatch = useDispatch();
  const updateBudget = (e) => {
    setBudget(e.target.value);
  };
  const findMinimumBills = () => {
    dispatch(updateMinimumBills(budget))
  };
  return (
    <div className="b-minimum-bills">
      <div className="b-minimum-bills__input">
        Enter Budget : <input type="number" value={budget} onChange={updateBudget} />
        <div className="b-minimum-bills__subtext">Number of funds(n) that can be paid : {n}</div>
      </div>
      <div className="b-minimum-bills__action">
        <button onClick={findMinimumBills}>Highlight bills</button>
      </div>
    </div>
  );
};
