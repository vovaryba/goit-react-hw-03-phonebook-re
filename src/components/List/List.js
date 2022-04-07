import PropTypes from 'prop-types';
import s from './List.module.css';

const List = ({ contacts, onDeleteContact }) => (
  <>
    {contacts.map(contact => (
      <ul key={contact.id}>
        <li>
          {contact.name}: {contact.number}
          <button
            className={s.button}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      </ul>
    ))}
  </>
);

List.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  onDeleteContact: PropTypes.func,
};

export default List;
