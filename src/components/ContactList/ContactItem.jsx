import PropTypes from 'prop-types';

const ContactItem = ({ onDelete, contact: { id, name, number } }) => {
  return (
    <li>
      <p>{name}:</p>
      <p>{number}</p>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  onDelete: PropTypes.func,
  contact: PropTypes.object,
};
export default ContactItem;
