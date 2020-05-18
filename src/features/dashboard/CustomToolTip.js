import React from 'react'

export const CustomToolTip = (props) => {
    if (props.active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${props.label} : ₹${props.payload[0].payload.amount}`}</p>
          <p className="intro">{props.payload[0].payload.category}</p>
          <p className="desc">{props.payload[0].payload.description}</p>
        </div>
      );
    }

    return null;
}
