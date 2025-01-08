import { useTheme } from "../theme/themeContext";
import whiteLogo from "../assets/whiteLogo.svg"
import blueLogo from "../assets/blueLogo.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

import ProfileInfo from "./cards/ProfileInfo";
import {userStore} from "../store/userStore"
import SearchBar from "./SearchBar";


const Navbar = ({handleClearSearch, onSearchNote}) => {
  const {darkMode, toggleTheme} = useTheme();
  const {logout, error, user, getUserInfo} = userStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(navigate);
  }, [getUserInfo, navigate]);

  //log out
  const handleLogout = async() => {
    await logout();
      if (!error) {
      navigate('/login');
    }
  };

  //clear search bar
  const onClearSearch =() => {
    setSearchQuery('');
    handleClearSearch();
  }

  const handleSearch = () => {
    if (searchQuery){
      onSearchNote(searchQuery);
    }
  }


  
  return (
    <div className="dark:bg-gradient-to-br from-[#0A112A] via-[#091a53] to-[#1b337e]">
    <div className="mx-auto flex justify-between h-[100px] pl-10 pr-14 items-center drop-shadow-xl border-1 dark:bg-gray-700/25 border-white z-10 bg-bluecyan ">
      <img src={whiteLogo}  
      alt="note task" 
      className="size-[160px]"/>

      <SearchBar
        user={user}
        value={searchQuery}
        onChange={({target}) => setSearchQuery(target.value)}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
        
        />

      <div className="flex flex-row space-x-4">
      <ProfileInfo user={user} onLogout={handleLogout} />

    <button 
        className='rounde-lg text-2xl bg-transparent p-1 text-slate-200' 
        onClick={toggleTheme}>
          {darkMode ? <Sun className="size-8" /> : <Moon className="size-8" />}
          </button>
          </div>
    </div>
    </div>
  )
}

export default Navbar