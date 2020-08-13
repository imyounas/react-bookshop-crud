import React from 'react'
import { Field, ErrorMessage } from 'formik'
import FieldError from './FieldError'

function Textarea(props) {
  const { label, name, ...rest } = props
  return (
    <div className="form-group mr-5">
      <label htmlFor={name}>{label}</label>
      <Field className="form-control" as='textarea' id={name} name={name} {...rest} />
      <ErrorMessage component={FieldError} name={name} />
    </div>
  )
}

export default Textarea
