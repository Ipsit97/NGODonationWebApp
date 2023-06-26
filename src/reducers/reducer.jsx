import { createReducer } from '@reduxjs/toolkit';
import { setIsEdit } from '../actions/actions';

const initialState = {
  formData: {},
  isEdit: true,
  loginInfo : {},
  activeAccountInfo:'',
  signUpFailureMessage : '',
};



const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIsEdit, (state, action) => {
      state.isEdit = action.payload;
    });
});

export default formReducer;
