import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBill, updateBill } from "./dashboardSlice";
import { isValidText, isValidNumber, formatDateForInput } from '../../utility';
export const EditBill = ({ id = "", description = "", amount = "", date = "", category = "", closeEdit }) => {
  const dispatch = useDispatch();

  const ctaLabel = id ? "Update" : "Add";

  const [bill, setBill] = useState({
    description,
    amount,
    date,
    category,
  });
  const [isDisabled, setisDisabled] = useState(true);
  const [error, setError] = useState('');
  const updateField = (e) => {    
    setBill({
      ...bill,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if(checkValidation()){
    if (id) {
      dispatch(updateBill({ id, ...bill }));
    } else {
      dispatch(addBill(bill));
    }
  }
  };
  const handleCancel = () => {
    closeEdit();
  };

  const checkValidation = () => {
    if(!(isValidText(bill.description) || isValidText(bill.category))) {
      setError('Description & category can contain alphabets only');
      return false;
    }
    if(!(isValidNumber(bill.amount))){
      setError('Amount can be number only');
      return false
    }
    return true;
  }

  useEffect(() => {
    if (!id && !(bill.description && bill.amount && bill.category && bill.date)) {
      setisDisabled(true);
    } else if (
      description === bill.description &&
      amount === bill.amount &&
      category === bill.category &&
      date === bill.date
    ) {
      setisDisabled(true);
    } else {
      setisDisabled(false);
    }
  }, [bill.description, bill.amount, bill.category, bill.date, id, description, amount, category, date]); //just added props to silence the linter
  return (
    <div className="b-edit-bill">
      <div className="b-edit-bill__input">
      <span className="b-edit-bill__label">Date :</span> <input type="date" value={formatDateForInput(bill.date)} name="date" onChange={updateField} min="2020-05-01" max="2020-05-31"/>
      </div>
      <div className="b-edit-bill__input">
        <span className="b-edit-bill__label">Description :</span> <input type="text" value={bill.description} name="description" onChange={updateField}  />
      </div>
      <div className="b-edit-bill__input">
      <span className="b-edit-bill__label">Amount ₹ :</span> <input value={bill.amount} name="amount" onChange={updateField} />
      </div>
      <div className="b-edit-bill__input">
      <span className="b-edit-bill__label">Category :</span> <input type="text"value={bill.category} name="category" onChange={updateField}  />
      </div>
      <div className="b-edit-bill__action">
        <button disabled={isDisabled} className={`${isDisabled ? "disabled" : ""}`} onClick={handleUpdate}>
          {ctaLabel}
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {error && <div className="b-edit-bill__error">{error}</div>}
    </div>
  );
};
