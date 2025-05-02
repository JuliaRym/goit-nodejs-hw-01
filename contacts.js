const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// ✅ List all contacts
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

// ✅ Get contact by ID
async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((c) => c.id === contactId) || null;
}

// ✅ Remove contact
async function removeContact(contactId) {
  const contacts = await listContacts();
  const updated = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updated, null, 2));
  return updated;
}

// ✅ Add contact
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
