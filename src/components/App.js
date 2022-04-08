import { Component } from 'react';
import shortid from 'shortid';
import AddContactForm from 'components/AddContactForm';
import Filter from 'components/Filter';
import List from 'components/List';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    const { contacts } = this.state;
    const notUniqueContact = contacts.find(ppl => ppl.name === contact.name);

    if (notUniqueContact) {
      alert(notUniqueContact.name + ' is already in contacts.');
      return;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <>
        <h1>Phonebook</h1>
        <AddContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <List contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;
