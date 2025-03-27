import { ValidationError } from 'yup';
// import { setError } from 'react-hook-form';

interface Errors {
  [key: string]: string;
}
export default function getValidatationErrors(err: ValidationError): Errors {
  const validatationErrors: Errors = {};
  err.inner.forEach(error => {
    // setError(error.path, { message: error.message, type: 'required' });
    // setError('name', { message: 'name', type: 'required' });
    validatationErrors[error.path] = error.message;
  });
  // setError(error.name, { message: error.message, type: 'required' });
  return validatationErrors;
}
