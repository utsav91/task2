import React, { useState, useEffect } from "react";
import { BillItem } from "./BillItem";
import { EditBill } from "./EditBill";
import { useSelector } from "react-redux";
import { selectCategories, selectFilteredBillsBy } from "./dashboardSlice";
export const BillList = () => {
  const categories = useSelector(selectCategories);
  const [filterBy, setfilterBy] = useState("ALL");
  const [editBill, setEditBill] = useState(null);

  const bills = useSelector((state) => selectFilteredBillsBy(state, filterBy));

  const monthlyAmount = (arr) => arr.reduce((a, b) => a + Number(b.amount), 0);
  const handleChange = (e) => {
    setfilterBy(e.target.value);
  };
  const handleEdit = (bill) => {
    setEditBill(bill);
  };
  const handleAdd = () => {
    setEditBill({});
  };

  const closeEdit = () => {
    setEditBill(null);
  };

  useEffect(() => {
    closeEdit();
  }, [bills])
  return (
    <div className="b-bill-list">
      <div className="b-bill-list__header">
        <div className="b-bill-list__header__title">Date</div>
        <div className="b-bill-list__header__title">Description</div>
        <div className="b-bill-list__header__title">Amount</div>
        <div className="b-bill-list__header__title">Filter by:</div>
        <select name="bills" onChange={handleChange}>
          <option value="ALL">ALL</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="b-bill-list__items">
        {bills.map((bill) => {
          return (
            <BillItem
              key={bill.id}
              id={bill.id}
              amount={bill.amount}
              description={bill.description}
              date={bill.date}
              category={bill.category}
              shouldHighLight={bill.shouldHighLight}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
      {bills.length === 0 && <div className="b-bill-list__empty">You have no bills in this category. Choose a different category.</div>}
      {bills.length !== 0 && <div className="b-bill-list__total">Total amount to be paid: {`₹ ${monthlyAmount(bills)}`}</div>}
      <button className="b-bill-list__add" onClick={handleAdd}>Add bill</button>
      {editBill && (
        <div className="b-bill-list__edit">
          <EditBill
            id={editBill.id}
            amount={editBill.amount}
            description={editBill.description}
            date={editBill.date}
            category={editBill.category}
            closeEdit={closeEdit}
          />
        </div>
      )}
    </div>
  );
};
