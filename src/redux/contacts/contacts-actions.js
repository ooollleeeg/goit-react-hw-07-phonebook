import { createAction } from '@reduxjs/toolkit';

export const fetchAllContactsLoading = createAction('contacts/fetch/loading');
export const fetchAllContactsSucces = createAction('contacts/fetch/succes');
export const fetchAllContactsError = createAction('contacts/fetch/error');

export const fetchAddContactsLoading = createAction('contacts/add/loading');
export const fetchAddContactsSucces = createAction('contacts/add/succes');
export const fetchAddContactsError = createAction('contacts/add/error');

export const fetchDeleteContactsLoading = createAction(
  'contacts/delete/loading'
);
export const fetchDeleteContactsSucces = createAction('contacts/delete/succes');
export const fetchDeleteContactsError = createAction('contacts/delete/error');
