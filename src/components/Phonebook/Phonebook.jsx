import { nanoid } from 'nanoid';

import React, { useState, useEffect } from 'react';

import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import css from './Phonebook.module.css';
import initialValues from '../../data/contacts.json';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(initialValues);
  const [filter, setFilter] = useState('');

  const handleSubmit = (values) => {
    const newName = contacts.some(contact =>
      contact.name.toLowerCase() === values.name.toLowerCase());
    if (newName) {
      return alert(`${values.name} is already in contacts`);
    }
    setContacts(prevContacts => prevContacts.concat({ ...values, id: nanoid() }))
  }

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

 const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)).sort((a, b) => a.name.localeCompare(b.name));
  }

  const visibleContacts = getVisibleContacts();


const deleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId))
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  return (
    <>
      <Section>
        <h2 className={css.Title}>Phonebook</h2>
        <ContactForm onSubmit={handleSubmit} />
        <h2 className={css.Title}>Contacts</h2>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} onClick={deleteContact} />
      </Section>
    </>
  );
};
