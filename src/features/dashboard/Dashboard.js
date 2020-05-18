import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBills, selectLoading } from "./dashboardSlice";
import { BillList } from "./BillList";
import { MinimumBills } from "./MinimumBills";
import { Chart } from "./Chart";
import logo from "../../logo.svg";
import "./Dashboard.css";

export function Dashboard() {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  return (
    <div className="b-dashboard">
      {loading === "pending" && <img src={logo} className="App-logo" alt="logo" />}
      {loading === "idle" && (
        <>
          <div>
            <BillList />
          </div>
          <div className="b-dashboard__chart">
            <MinimumBills />
            <Chart />
          </div>
        </>
      )}
    </div>
  );
}
