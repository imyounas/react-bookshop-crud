import React from 'react'
import { Field, ErrorMessage } from 'formik'
import FieldError from './FieldError'

function Select(props) {
  const { label, name, options, onValueChangeEvent, ...rest } = props
  return (
    <div className="form-group mr-5">
      <label htmlFor={name}>{label}</label>
      <Field className="form-control" as='select' id={name} onChange={onValueChangeEvent} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage component={FieldError} name={name} />
    </div>
  )
}

export default Select
