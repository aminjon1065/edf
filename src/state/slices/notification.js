import {createSlice} from "@reduxjs/toolkit";

const initialState =
    {
        isOpen: false,
        uuid: null
    };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        openNotification(state, action) {
            state.isOpen = true;
            state.uuid = action.payload
        },
        closeNotification(state) {
            state.isOpen = false;
            state.uuid = null
        },

    }
})

export const {openNotification, closeNotification} = notificationSlice.actions;

export const openModalNotification = (uuid) => (dispatch) => {
    dispatch(openNotification(uuid))
}
export default notificationSlice.reducer;