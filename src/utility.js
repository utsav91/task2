export const formatDate = (date, forChart = false) => {
  date = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let day = date.getDate();
  if (day / 10 < 1) day = `0${day}`;
  let monthIndex = date.getMonth();
  if (forChart) return "" + day + " " + months[monthIndex];
  let year = date.getFullYear();

  return "" + day + " " + months[monthIndex] + " " + year;
};

export const buildChartData = (bills) => {
  let clone = [...bills].map((bill) => {
    return {
      ...bill,
      amount: +bill.amount,
      xAxis: formatDate(bill.date, true),
    };
  });
  return clone.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const isValidText = (value) => {
  const regex = /^[a-z]+$/i;
  return regex.test(value)
};

export const isValidNumber = (value) => {
  const regex = /^[0-9]*$/;
  return regex.test(+value)
};

export const formatDateForInput = date => {
  let dateArray = date.split('-');
    let year = dateArray.pop();
    if(year.length !== 4) return date;
    let day = dateArray.pop();
    dateArray.unshift(year)
    dateArray.push(day)  
  return dateArray.join('-');

}
