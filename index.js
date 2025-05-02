const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const all = await listContacts();
      console.table(all);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("Added:", newContact);
      break;

    case "remove":
      const result = await removeContact(id);
      console.log("Updated list:", result);
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
