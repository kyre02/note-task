import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (theme === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }return theme;
};

export const ThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("darkMode"); // Check localStorage on initial render
        return savedTheme ? JSON.parse(savedTheme) : false;
});

    useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode)); // Update localStorage when theme changes
      document.documentElement.classList.toggle("dark", darkMode); // Add or remove the "dark" class from the document root
    
    }, [darkMode]);

    const toggleTheme = () => {setDarkMode(prev => !prev)}; // Toggle the theme

    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}