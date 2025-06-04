import { createContext, useContext, useState } from "react";

const TextColContext = createContext();
export const ColProvider = ({children})=>{
const [bgTextCol, setBgTextCol]=useState('text-black')
return(
<TextColContext.Provider value={{bgTextCol,setBgTextCol}}>{children}</TextColContext.Provider>);
};

export const useTextCol = ()=>useContext(TextColContext)