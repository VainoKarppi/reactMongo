import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import { updateContact } from "../contacts";

//exports update contact

export async function action({ request, params }) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    // TODO call backend store data
    console.log("AAAAA");
    const contact = await updateContact(params.contactId, updates);
    console.log(contact.id);
    console.log("BBBB");

    return redirect(`/contacts/${params.contactId}`);
}




//Edit contact view
export default function EditContact() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="firstname"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="lastname"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatarUrl"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        

        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}