"use client";
import type { ReactNode } from "react";
import type { Order } from "@/types/order";
import { createContext, useCallback, useEffect, useReducer } from "react";

export enum Actions {
   SET_ORDER = 0x01
}

interface CustomComponentProps {
   children: ReactNode;
}
interface CustomContextProps {
   order: Order;
   setOrder(value: Order): void;
}
interface CustomDispatchProps {
   type: Actions;
   value: Order;
}

const _initialState: CustomContextProps = {
   order: {
      products: [],
      currency: "USD",
      discount: 0,
      total: 0
   },
   setOrder: (value: Order) => {}
};

const statesReducer = (
   state: CustomContextProps,
   action: CustomDispatchProps
): CustomContextProps => {
   switch (action.type) {
      case Actions.SET_ORDER:
         if (localStorage) {
            if (action.value) {
               localStorage.setItem("order", JSON.stringify(action.value));
            } else {
               localStorage.removeItem("order");
            }
         }

         return { ...state, order: action.value };
      default:
         return state;
   }
};

export const AppStatesContext =
   createContext<CustomContextProps>(_initialState);

export function AppStatesProvider({
   children
}: Readonly<CustomComponentProps>) {
   const [state, dispatch] = useReducer(statesReducer, _initialState);

   const initialValue = {
      order: state.order,
      setOrder: useCallback(
         (value: Order) => dispatch({ type: Actions.SET_ORDER, value: value }),
         []
      )
   };

   useEffect(() => {
      if (localStorage) {
         const lsOrder = localStorage.getItem("order");

         if (lsOrder) {
            dispatch({
               type: Actions.SET_ORDER,
               value: JSON.parse(lsOrder) as Order
            });
         }
      }
   }, []);

   return (
      <AppStatesContext.Provider value={initialValue}>
         {children}
      </AppStatesContext.Provider>
   );
}
