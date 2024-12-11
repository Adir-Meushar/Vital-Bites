import { useContext } from 'react';
import { GeneralContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function Logout({handleClick}) {
    const { setUser, user,showToastMessage } = useContext(GeneralContext)
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        showToastMessage(`Until Next Time ${user.fullName} 😁`,'#2196F3')
        setUser(null)
        navigate('/')
        handleClick();
    }

    return (
        <>
            <div onClick={logout} className="icon icon-collapse"><i className="fa fa-sign-in"></i></div>
        </>
    )
}

export default Logout;
