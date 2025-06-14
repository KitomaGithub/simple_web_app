"use client";
import { persistor, store } from "@/app/state/store";
import { ReactNode } from "react"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  readonly children: ReactNode;
}

export default function StoreProvider ({children} : Props) {
    return <Provider store={store}> <PersistGate loading={null} persistor={persistor}> {children} </PersistGate>  </Provider>
}