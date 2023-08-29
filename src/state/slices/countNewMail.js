import {createSlice} from "@reduxjs/toolkit";

const initialState =
    {
        count: 0,
    };

const countNewMailSlice = createSlice({
    name: "countNewMail",
    initialState,
    reducers: {
        countState(state, action) {
            state.count = action.payload;
        },
    }
})

export const {countState} = countNewMailSlice.actions;
export default countNewMailSlice.reducer;

export const countNewMail = (count) => (dispatch) => {
    dispatch(countState(count));
}
