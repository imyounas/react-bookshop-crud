import React from 'react'
import { Field, ErrorMessage } from 'formik'
import FieldError from './FieldError'

function Select(props) {
  const { label, name, options, ...rest } = props

  // function handleChangeEvent(event) {

  //   //event.stopPropagation()
  //   console.log("select change event in parent");
  //   event.preventDefault();
  //   const { name, value } = event.target;

  //   console.log(name, value);
  // };

  return (
    <div className="form-group mr-5">
      <label htmlFor={name}>{label}</label>
      {/* onChange={onValueChangeEvent} */}
      <Field className="form-control" component='select' id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      {/* <select className="form-control" component='select' onChange={handleChangeEvent} id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </select> */}
      <ErrorMessage component={FieldError} name={name} />
    </div>
  )
}

export default Select
