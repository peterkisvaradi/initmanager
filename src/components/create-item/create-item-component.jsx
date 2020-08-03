import React from 'react';
import './create-item.styles.css';

const CreateItem = ({
  handleChange,
  handleSubmit,
  inputValue,
  error,
  label,
  buttonTitle,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>{label}</label>
      <input value={inputValue} onChange={handleChange} required />
      <button disabled={error} type="submit">
        {buttonTitle}
      </button>
      {error && <div>ERROR</div>}
    </form>
  );
};

export default CreateItem;
