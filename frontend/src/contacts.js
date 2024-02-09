import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from './axiosConfig';


// Query contacts from list
export async function getContacts(query) {

  try {
    console.log("requesting ALL contacts...");
    const response = await axios.get('/api/contactRoutes/allUsers');
    let contacts = response.data;
    console.log(contacts);

    if (!contacts) contacts = [];
    
    return contacts;

    // TODO fetch only from local list
    if (query) {
      contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }

    // TODO sortby
    return contacts.sort(sortBy("last", "createdAt"));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}



// Get single contact from list
export async function getContact(id) {
    console.log(`Requesting contact: ${id}`);
    const response = await axios.get(`/api/contactRoutes/contact/${id}`);
    console.log(response.data);
    return response.data;
}

// Update contacts list
export async function updateContact(id, contact) {
    try {
        let data;
        if (contact.id === undefined || contact.id === null) {

          // CREATE NEW USER
          axios.post("/api/contactRoutes/contacts",contact)
            .then(response => {
              console.log('Contact created successfully:', response.data);
              data = response.data;
            })
            .catch(error => {
              console.error('Error creating contact:', error);
          });
        } else {
            
          // UPDATE EXISTING USER DATA
          axios.patch(`/api/contactRoutes/contacts/${id}`,contact)
            .then(response => {
              console.log('Contact updated successfully:', response.data);
              data = response.data;
            })
            .catch(error => {
              console.error('Error updating contact:', error);
          });
        }
        return data;
    } catch (error) {
        console.error('Error updating or creating contact:', error.message);
        throw error;
    }
    
}




// Delete contact from list
export async function deleteContact(id) {
  //TODO backend
  console.log("Removing contact...");
  console.log(id);

  await axios.delete("/api/contactRoutes/removeContact",id)
      .then(response => {
        console.log('Contact removed successfully:', response.data);
        return true;
      })
      .catch(error => {
        console.error('Error removing contact:', error);
        return false;
    });
}




