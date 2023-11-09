import { Contact } from '../Contact/Contact';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} onDeleteContact={onDeleteContact} />
        </li>
      ))}
    </ul>
  );
};
