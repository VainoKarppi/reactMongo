import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from './axiosConfig';


// Query contacts from list
export async function getContacts(query) {

  // TODO backend get
  //let contacts = await localforage.getItem("contacts");
  try {
    console.log("requesting");
    const response = await axios.get('http://localhost:3000/api/contactRoutes');
    let contacts = response.data;

    console.log("dddddddddddddddd");
    console.log(contacts);
    if (!contacts) contacts = [];


    console.log("11111");

    if (query) {
      contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }
    return contacts.sort(sortBy("last", "createdAt"));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Create new contact with values
export async function createContact() {
  let id = Math.random().toString(36).substring(2, 9);

  // TODO
  let contact = { id, createdAt: Date.now() };

  //TODO push only single contact instead of whole set
  let contacts = await getContacts();
  contacts.unshift(contact);

  await set(contacts);

  return contact;
}

// Get single contact from list
export async function getContact(id) {

  // TODO backend
  let contacts = await localforage.getItem("contacts");

  let data = axios.get('/api/contactRoutes')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

  
  console.log(data);

  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

// Update contacts list
export async function updateContact(id, updates) {



  
  //TODO backend
  let contacts = await localforage.getItem("contacts");

  let data = axios.put('/api/contactRoutes')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

  
  console.log(data);

  let contact = contacts.find(contact => contact.id === id);

  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);

  await set(contacts);
  return contact;
}

export async function setUsers(data) {
  console.log("ASDASD");
  console.log(data);
}


// Delete contact from list
export async function deleteContact(id) {
  //TODO backend
  let contacts = await localforage.getItem("contacts");

  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  //TODO backend
  return localforage.setItem("contacts", contacts);
}

