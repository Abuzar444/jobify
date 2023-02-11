import React from 'react'

const FormRow = ({ name, type, value, handleChange, lebelText }) => {
    return (

        <div className="form-row">
            <label htmlFor={name} className="form-label">{lebelText || name}</label>
            <input
                type={type}
                name={name}
                value={value}
                className='form-input'
                onChange={handleChange}
                placeholder={`enter your ${lebelText || name}`}
            />
        </div>
    )
}

export default FormRow