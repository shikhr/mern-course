const FormRow = ({ type, name, value, handleChange, labelText }) => {
  const autocomplete = {
    value: 'true',
  };
  if (type === 'password') {
    autocomplete.value = 'current-password';
  }
  if (type === 'name') {
    autocomplete.value = 'username';
  }
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        autoComplete={autocomplete.value}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
