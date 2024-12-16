import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Router from './components/router/Router';
import CenteredLayout from './components/centeredLayout/CenteredLayout';
import ToastMessage from './components/toastMessage/ToastMessage';
import { useNavigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import CoverImg from './components/cover-img/CoverImg';


export const GeneralContext = createContext();

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignModal] = useState(false);
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [myFavorite,setMyFavorite]=useState([]);
  const [myRecipes, setMyRecipes]=useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gridLoader, setGridLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('')
  const [toastBgColor, setToastBgColor] = useState('');

  const showToastMessage = (message, bgColor) => {
    setToastMessage(message);
    setToastBgColor(bgColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const { currentUser } = decodedToken;
      setUser(currentUser);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate('/');
      }
    }
  };

  const fetchRecipes = async () => {
    try {
      setGridLoader(true)
      const response = await fetch("http://localhost:5000/recipe/all", {
        credentials: "include",
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
      console.log(data);
      setGridLoader(false)
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Optionally, show an error message to the user
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser();  // You may want these to run sequentially
      await fetchRecipes();
    };

    fetchData();
  }, []);




  return (
    <GeneralContext.Provider value={{
      loginModal, setLoginModal, signupModal, setSignModal,
       user, setUser, showToastMessage, 
       recipes, setRecipes,myFavorite,setMyFavorite,
       myRecipes, setMyRecipes,gridLoader, setGridLoader,searchQuery,setSearchQuery
    }}>
      <CenteredLayout>
        <Navbar />
        <CoverImg/>
        <Router />
        <Footer />
        {showToast && <ToastMessage message={toastMessage} bgColor={toastBgColor} visible={showToast} />}
      </CenteredLayout>



    </GeneralContext.Provider>
  );
}

export default App;
