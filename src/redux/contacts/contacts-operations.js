import {
  getContacts,
  addContact,
  deleteContact,
} from '../../shared/services/contacts-api';

import * as actions from './contacts-actions';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchAllContactsLoading()); // запит пішов
      const data = await getContacts();
      dispatch(actions.fetchAllContactsSucces(data)); // запит прийшов успішно
    } catch ({ response }) {
      dispatch(actions.fetchAllContactsError(response.data.message)); // запит прийшов з помилкою
    }
  };
  return func;
};

const isDublicate = (contacts, { name }) => {
  const normalizedName = name.toLowerCase();
  const result = contacts.find(({ name }) => {
    return name.toLowerCase() === normalizedName;
  });
  return Boolean(result);
};

export const fetchAddContact = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDublicate(contacts.items, data)) {
        alert(`${data.name} is already in contacts`);
        return false;
      }
      dispatch(actions.fetchAddContactsLoading());
      const result = await addContact(data);
      dispatch(actions.fetchAddContactsSucces(result));
    } catch ({ response }) {
      dispatch(actions.fetchAddContactsError(response.data.message));
    }
  };
  return func;
};

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
