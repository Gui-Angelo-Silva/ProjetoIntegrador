import React from 'react'
import Label from '../Label/Label'
import InputText from '../Input/InputText'
import ErrorMessageInput from '../Errors/ErrorMessageInput'

const FormField = ({ label, isRequired, inputProps, errors }) => {
    return (
        <div className='form-group'>
            <Label subject={label} required={isRequired} />
            <br />
            <InputText {...inputProps} />
            {errors && <ErrorMessageInput errors={errors} />}
            <br />
        </div>
    )
}

export default FormField