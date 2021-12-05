import './form-input.styles.css';

const FormInput = ({ name, handleChange, ...otherProps}) => {
    return (
        <div className='group'>
            <label htmlFor={name}>{`${name}:`}</label><br />
            <input onChange={handleChange} name={name} {...otherProps}/><br />
        </div>
    )
}

export default FormInput;