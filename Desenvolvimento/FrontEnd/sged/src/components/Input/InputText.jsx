import React from 'react'

const InputText = ({
  onChange,
  value,
  maxLength = null,
  disabled = false,
  onKeyDown = () => { },
  onBlur = () => { },
}) => {
  return (
    <input
      type="text"
      className="form-control rounded-md border-[#BCBCBC]"
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      disabled={disabled}
      onBlur={onBlur}
      maxLength={maxLength}
    />
  )
}

export default InputText