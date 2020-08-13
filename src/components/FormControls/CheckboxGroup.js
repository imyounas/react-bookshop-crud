import React from 'react'
import { Field, ErrorMessage } from 'formik'
import FieldError from './FieldError'

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props
  return (
    < div className="form-group mr-5" >
      <label>{label}</label>
      <Field className="form-control" name={name}>
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={FieldError} name={name} />
    </div >
  )
}

export default CheckboxGroup
