const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath);

    return JSON.parse(allContacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newConctact = { id: nanoid(), name, email, phone };
    contacts.push(newConctact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newConctact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
