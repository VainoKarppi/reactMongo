import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from './axiosConfig';


// Query contacts from list
export async function getContacts(query) {

  // TODO backend get
  //let contacts = await localforage.getItem("contacts");
  try {
    console.log("requesting ALL contacts...");
    const response = await axios.get('/api/contactRoutes');
    let contacts = response.data;

    console.log(contacts);

    if (!contacts) contacts = [];


    if (query) {
      contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }

    // TODO sortby
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



  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

// Update contacts list
export async function updateContact(id, updates) {

  if (id === undefined || id === null) {
    // UPDATE EXISTING USER DATA
    axios.put("/api/contactRoutes/createContact",id)
      .then(response => {
        console.log('Contact updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating contact:', error);
    });
  } else {
    // CREATE NEW USER
    axios.post("/api/contactRoutes/createContact")
      .then(response => {
        console.log('Contact created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating contact:', error);
    });
  }


  
  //TODO backend
  let contacts = await localforage.getItem("contacts");


  let contact = contacts.find(contact => contact.id === id);

  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);

  await set(contacts);
  return contact;
}




// Delete contact from list
export async function deleteContact(id) {
  //TODO backend
  console.log("Removing contact...");

  await axios.delete(`/api/contactRoutes/removeContact/${id}`)
      .then(response => {
        console.log('Contact updated successfully:', response.data);
        return true;
      })
      .catch(error => {
        console.error('Error updating contact:', error);
        return false;
    });
}

function set(contacts) {
  //TODO backend
  return localforage.setItem("contacts", contacts);
}

