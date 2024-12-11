import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
import { loginSchema } from "./loginSchema";
import '../authModal.css'

function Login() {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const inputFields = [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
    ];

    const {setUser, loginModal, setSignModal, setLoginModal, showToastMessage } = useContext(GeneralContext);

    const handleValid = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value }
        setFormData(obj)
        const validate = loginSchema.validate(obj, { abortEarly: false })
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
    const handleLogin = async (ev, setUser) => {
        ev.preventDefault();
        try {
          const response = await fetch("http://localhost:5000/users/login", {
            credentials: "include",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
          
          if (data.error) {
            setErrors(data.error);
            setIsFormValid(false)
          } else {
            localStorage.setItem("token", data.token);
            setUser(data.user); 
            setLoginModal(false);
            setFormData({
              email: "",
              password: "",
            });
            setErrors([]);
            showToastMessage(`Hello & Welcome ${data.user.fullName}!`,'#4CAF50')
            console.log(data);
            
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          showToastMessage('Email or Password is Incorrect','red')
        }

      };
      const cleanForm = () => {
        setLoginModal(false);
        setFormData({
           email: "", password: ""
        });
        setErrors([]);
        setIsFormValid(false);
    }
    return (

        <>
            <button className="nav-auth-btn" onClick={() => setLoginModal(true)}>Login</button>
            {loginModal && (
                <div className='modal-frame' onClick={cleanForm}>
                    <div className="form-container" onClick={(ev)=>ev.stopPropagation()}>
                        <button className='close-button' onClick={cleanForm}>X</button>
                        <h1 className="form-heading">Login</h1>
                        <form onSubmit={(e) => handleLogin(e, setUser)} className="form">
                            {
                                inputFields.map((field, index) => (
                                    <label key={index} className="form-label">
                                       <span>{field.label}</span> 
                                        <input name={field.name} type={field.type} autoComplete='off' className="form-input" onChange={handleValid} value={formData[field.name]} />
                                    </label>
                                ))
                            }
                            <button type="submit" className="form-button">Login</button>
                            <p className="auth-link " onClick={() => { setLoginModal(false); setSignModal(true); }}>
                                First time here? Sign up
                            </p>
                        </form>
                    </div>
                </div>
            )
         }
        </>

    )
}

export default Login
