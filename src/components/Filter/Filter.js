import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <>
      <div>
        <h2>Contacts</h2>
        <label>
          Find contact by name
          <input onChange={onChange} type="text" name="filter" value={value} />
        </label>
      </div>
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
