import { useEffect, useState } from 'react';
import { ContactForm } from './components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { DivStyled } from './components/App/AppStyled';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('Contact-list')) || initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('Contact-list', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const findedName = contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );

    findedName
      ? alert(`Contact ${contact.name} is already in the contacts list`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const getFindedContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const findedContacts = getFindedContacts();

  const deleteContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <DivStyled>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />
        <Filter value={filter} onChange={handleChange} />
        <ContactList
          contacts={findedContacts}
          onDeleteContact={deleteContact}
        />
      </DivStyled>
    </>
  );
};
