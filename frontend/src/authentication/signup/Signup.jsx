import { useContext, useState } from 'react';
import '../authModal.css'
import { signupSchema } from './signupSchema';
import { GeneralContext } from '../../App';



function Signup() {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const inputFields = [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
    ];

    const { signupModal, setSignModal, setLoginModal, showToastMessage } = useContext(GeneralContext);


    const handleValid = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value }
        setFormData(obj)
        const validate = signupSchema.validate(obj, { abortEarly: false })
        const tempErrors = { ...errors }
        delete tempErrors[name];
        if (validate.error) {
            const item = validate.error.details.find((e) => e.context.key == name)
            if (item) {
                tempErrors[name] = item.message;
            }
        }
        setIsFormValid(!validate.error)
        setErrors(tempErrors)
    }


    const handleSignup = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/signup', {
                credentials: 'include',
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
              console.log(data);
              

            if (data.error) {
                if (data.error.includes('Email already exists')) {
                    showToastMessage(`Email already exists`, '#4CAF50')
                } else {
                    setErrors(data.error);
                }
            } else {
                cleanForm();
                showToastMessage(`Hello & Welcome! Please Login To Your Account `, '#4CAF50');//${data.fullName}?
                setLoginModal(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    const cleanForm = () => {
        setSignModal(false);
        setFormData({
            fullName: '', email: "", password: ""
        });
        setErrors([]);
        setIsFormValid(false);
    }

    return (
        <>
            <button className="nav-auth-btn" onClick={() => setSignModal(true)}>Signup</button>
            {signupModal && (
                <div className='modal-frame' onClick={cleanForm}>
                    <div className="form-container" onClick={(ev) => ev.stopPropagation()}>
                        <button className='close-button' onClick={cleanForm}>X</button>
                        <h1 className="form-heading">Signup</h1>
                        <form onSubmit={handleSignup} className="form">
                            {
                                inputFields.map((field, index) => (
                                    <label key={index} className="form-label">
                                        <span>{field.label}</span>
                                        <input name={field.name} type={field.type} autoComplete='off' className="form-input" onChange={handleValid} value={formData[field.name]} />
                                        {errors[field.name] && (
                                            <div className="error-message">{errors[field.name]}</div>
                                        )}
                                    </label>
                                ))
                            }
                            <button type="submit" className="form-button" disabled={!isFormValid}>Signup</button>
                            <p className="auth-link " onClick={() => { setLoginModal(true); setSignModal(false); }}>
                                Already signed up? Log in
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>

    );
}

export default Signup;