const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
   const contacts = await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(contacts);
}

async function getContactById(contactId) {
   const allContacts = await listContacts();
   const result = allContacts.find((contact) => contact.id === contactId);
   return result || null;
}

async function removeContact(contactId) {
   const allContacts = await listContacts();
   const index = allContacts.findIndex((contact) => contact.id === contactId);

   if (index === -1) {
      return null;
   }

   const [result] = allContacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
   return result;
}

async function addContact(name, email, phone) {
   const allContacts = await listContacts();
   const newContact = { id: nanoid(), name, email, phone };

   allContacts.push(newContact);

   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

   return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
