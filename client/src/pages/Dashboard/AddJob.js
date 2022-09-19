import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import Alert from '../../components/Alert';

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    position,
    company,
    isEditing,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position.trim() || !company.trim() || !jobLocation.trim()) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            options={statusOptions}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobType"
            labelText="type"
            value={jobType}
            options={jobTypeOptions}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
