// CSS
// import './form-input.css';

// CSS Modules
import S from './form-input.module.css';

import { type ComponentProps, useId } from 'react';

function FormInput({
  label,
  ...inputProps
}: ComponentProps<'input'> & {
  label: string;
}) {
  const id = useId();

  return (
    // CSS
    // <div className="FormInput">

    // CSS Modules
    <div className={S.formInput}>
      <label className={S.formInputLabel} htmlFor={id}>
        {label}
      </label>
      <input id={id} {...inputProps} />
    </div>
  );
}

export default FormInput;
