import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { getBills } from "../../mock/mockBills.js";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    bills: [],
    loading: "idle",
  },
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    billsLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    billsReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.bills = action.payload;
      }
    },
    addBill(state, action) {
      state.bills.unshift({ id: state.bills.length + 1, ...action.payload });
    },
    updateBill(state, action) {
      state.bills.forEach((bill, index) => {
        if (bill.id === action.payload.id) state.bills[index] = action.payload;
      });
    },
    removeBill(state, action) {
      state.bills.splice(
        state.bills.findIndex((bill) => bill.id === action.payload),
        1
      );
    },
    updateMinimumBills(state, action){
      let budget = action.payload;
      state.bills.forEach(bill => {
        if(+bill.amount <= +budget){
          budget = budget - bill.amount;
          bill.shouldHighLight = true;
        }else {
          bill.shouldHighLight = false;

        }
      })
    },
  },
});

export const {
  billsLoading,
  billsReceived,
  updateBill,
  removeBill,
  addBill,
  updateMinimumBills,
} = dashboardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchBills = () => async (dispatch) => {
  dispatch(billsLoading());
  let response = await getBills();
  response.forEach(bill => {
    bill.shouldHighLight = false
  })
  dispatch(billsReceived(response));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBills = (state) => state.dashboard.bills;
export const minimumBillsLength = state => state.dashboard.bills.filter(bill => bill.shouldHighLight).length;
export const selectFilteredBillsBy = createSelector(
  (state) => state.dashboard.bills,
  (_, filterBy) => filterBy,
  (bills, filterBy) => {
    if (filterBy === "ALL") return bills;
    return bills.filter((bill) => bill.category === filterBy);
  }
);
export const selectLoading = (state) => state.dashboard.loading;
export const selectCategories = (state) => {
  let categories = {};
  state.dashboard.bills.forEach(({ id, category }) => {
    if (!categories[category]) {
      categories[category] = true;
    }
  });
  return Object.keys(categories);
};

export default dashboardSlice.reducer;
