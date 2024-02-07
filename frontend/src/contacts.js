import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from 'axios';

// Query contacts from list
export async function getContacts(query) {

  // TODO backend get
  let contacts = await localforage.getItem("contacts");

  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

// Create new contact with values
export async function createContact() {
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
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

