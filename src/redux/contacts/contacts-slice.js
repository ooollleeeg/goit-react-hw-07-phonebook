import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllContactsLoading,
  fetchAllContactsSucces,
  fetchAllContactsError,
  fetchAddContactsLoading,
  fetchAddContactsSucces,
  fetchAddContactsError,
  fetchDeleteContactsLoading,
  fetchDeleteContactsSucces,
  fetchDeleteContactsError,
} from './contacts-actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchAllContactsLoading]: store => {
      store.loading = true;
    },
    [fetchAllContactsSucces]: (store, { payload }) => {
      console.log(payload);
      store.loading = false;
      store.items = payload;
    },
    [fetchAllContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [fetchAddContactsLoading]: store => {
      store.loading = true;
    },
    [fetchAddContactsSucces]: (store, { payload }) => {
      store.loading = false;
      store.items.push(payload);
    },
    [fetchAddContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [fetchDeleteContactsLoading]: store => {
      store.loading = true;
    },
    [fetchDeleteContactsSucces]: (store, { payload }) => {
      store.loading = false;
      const index = store.items.findIndex(item => item.id === payload);
      store.items.splice(index, 1);
    },
    [fetchDeleteContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
