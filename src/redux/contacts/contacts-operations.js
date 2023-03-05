import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getContacts,
  addContact,
  deleteContact,
} from '../../shared/services/contacts-api';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await getContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContact(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      const normalizedName = name.toLowerCase();
      const result = contacts.items.find(({ name }) => {
        return name.toLowerCase() === normalizedName;
      });
      if (result) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

/*
export const fetchDeleteContact = id => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchDeleteContactsLoading());
      await deleteContact(id);
      dispatch(actions.fetchDeleteContactsSucces(id));
    } catch ({ response }) {
      dispatch(actions.fetchDeleteContactsError(response.data.message));
    }
  };
  return func;
};
*/
export const fetchDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContact(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
