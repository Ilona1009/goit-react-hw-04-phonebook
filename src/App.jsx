import { Component } from 'react';
import { ContactForm } from './components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { DivStyled } from './components/App/AppStyled';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const findedName = this.state.contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    findedName
      ? alert(`Contact ${contact.name} is already in the contacts list`)
      : this.setState(prevState => {
          return { contacts: [...prevState.contacts, contact] };
        });
  };

  getFindedContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        {' '}
        <DivStyled>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.handleSubmit} />
          <Filter value={filter} onChange={this.handleChange} />
          <ContactList
            contacts={this.getFindedContacts()}
            onDeleteContact={this.deleteContact}
          />
        </DivStyled>
      </>
    );
  }
}
