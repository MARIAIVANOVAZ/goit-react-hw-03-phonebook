import ContactItem from './ContactItem';
import PropTypes from 'prop-types';

export function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        ></ContactItem>
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  onDelete: PropTypes.func,
  contacts: PropTypes.array,
};
