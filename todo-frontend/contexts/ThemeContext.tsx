import React, { createContext, useState, useContext, ReactNode } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }:{ children: ReactNode }) => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<Theme>(colorScheme === "dark" ? "dark" : "light");

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThmeProvider');
    return context;
};

