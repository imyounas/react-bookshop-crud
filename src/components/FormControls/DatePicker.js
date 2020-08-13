import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import FieldError from './FieldError'
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker(props) {
  const { label, name, ...rest } = props
  return (
    <div className="form-group mr-5">
      <label htmlFor={name}>{label}</label>
      <Field className="form-control" name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={val => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
      <ErrorMessage component={FieldError} name={name} />
    </div>
  )
}

export default DatePicker
