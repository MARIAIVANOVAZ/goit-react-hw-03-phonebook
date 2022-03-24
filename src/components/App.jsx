import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './СontactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    console.log(newContact);
    const contact = {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    };
    console.log(contact);
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  onFilterChange = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  componentDidUpdate(prevState) {
    console.log('App component did update');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState(prevState => ({
        contacts: parsedContacts,
        ...prevState.contacts,
      }));
      // this.setState({ contacts: parsedContacts, ...contacts });
    }
  }
  render() {
    const filteredContact = this.getFilteredContact();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2> Contacts</h2>
        <ContactList
          contacts={filteredContact}
          onDelete={this.deleteContact}
        ></ContactList>
        <Filter
          value={this.state.filter}
          onChange={this.onFilterChange}
        ></Filter>
      </div>
    );
  }
}
