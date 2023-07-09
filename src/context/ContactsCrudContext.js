import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";
import ConfirmationPopup from "../components/ConfirmationPopup";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);
  const [enabelDeleteItem, setEnableDeleteItem] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState();

  useEffect(() => {
    if (enabelDeleteItem) {
      console.log(deleteItemId);
      removeContactHandler(deleteItemId);
      setDeleteItemId("");
      setEnableDeleteItem(false);
    }
  }, [enabelDeleteItem, deleteItemId]);
  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContacts(response.data);
    }
  };

  //Add contact
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  //remove contact
  const showDeleteAlert = (id) => {
    setDeleteItemId(id);
    setShow(true);
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  //Edit or Update contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contact,
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults,
    showDeleteAlert,
  };

  return (
    <contactsCrudContext.Provider value={value}>
      {children}
      {show ? (
        <ConfirmationPopup
          setShow={setShow}
          setEnableDeleteItem={setEnableDeleteItem}
        />
      ) : (
        ""
      )}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
