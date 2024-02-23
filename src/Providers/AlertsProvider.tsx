"use client";

import React, { PropsWithChildren, createContext, useState, useContext } from "react";

const AlertsContext = createContext({});

export default function AlertsProvider({ children }: PropsWithChildren) {
   const [currentAlert, setCurrentAlert] = useState<string | null>(null);

   return <AlertsContext.Provider value={{ currentAlert, setCurrentAlert }}>{children}</AlertsContext.Provider>;
}

export function useCurrentAlert() {
   return useContext(AlertsContext);
}
