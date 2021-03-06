import React from 'react'
import { useDispatch } from "react-redux";
import {
  removeBill
} from "./dashboardSlice";
import { formatDate } from '../../utility';

export function BillItem ({ id, description, category, amount, date, shouldHighLight, handleEdit }) {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    handleEdit({id ,description, category, amount, date})
  }
  const handleRemoveClick = () => {
    dispatch(removeBill(id))
  }
  return (
    <div className={`b-bill-item ${shouldHighLight ? 'highlight' : ''}`}>
      <div className="b-bill-item__info">
        <div className="b-bill-item__info__date"> {formatDate(date)} </div>
        <div className="b-bill-item__info__description"> {description} </div>
        <div className="b-bill-item__info__amount"> {`₹ ${amount}`} </div>
      </div>
    <div className="b-bill-item__action">
      <button className="b-bill-item__action__item" onClick={handleEditClick}>Edit</button>
      <button className="b-bill-item__action__item" onClick={handleRemoveClick}>Remove</button>
    </div>
    </div>
  )
}
