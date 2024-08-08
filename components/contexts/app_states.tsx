"use client";
import type { ReactNode, SetStateAction } from "react";
import type { User } from "@/types/user";
import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState
} from "react";

interface CustomComponentProps {
   children: ReactNode;
}

interface CustomContextProps {
   user: User | null;
   setUser(newState: SetStateAction<User | null>): void;
   reportsInitialDate: Date;
   setReportsInitialDate(newState: SetStateAction<Date>): void;
   reportsFinalDate: Date;
   setReportsFinalDate(newState: SetStateAction<Date>): void;
}

let _appStates: CustomContextProps = {} as CustomContextProps;

export const AppStatesContext = createContext<CustomContextProps>(_appStates);

export function useAppStates(): CustomContextProps {
   return useContext<CustomContextProps>(AppStatesContext);
}

export function AppStatesProvider({
   children
}: Readonly<CustomComponentProps>) {
   const [user, setUser_] = useState<User | null>(null);
   const setUser = useCallback((data: SetStateAction<User | null>) => {
      if (localStorage) {
         if (data) {
            localStorage.setItem("user", JSON.stringify(data));
         } else {
            localStorage.removeItem("user");
         }
      }

      setUser_(data);
   }, []);
   const [reportsInitialDate, setReportsInitialDate] = useState<Date>(
      new Date()
   );
   const [reportsFinalDate, setReportsFinalDate] = useState<Date>(new Date());

   _appStates = {
      user,
      setUser,
      reportsInitialDate,
      setReportsInitialDate,
      reportsFinalDate,
      setReportsFinalDate
   };

   useEffect(() => {
      if (localStorage) {
         const lsUser = localStorage.getItem("user");

         if (lsUser) {
            setUser(JSON.parse(lsUser) as User);
         }
      }
   }, [setUser]);

   return (
      <AppStatesContext.Provider value={_appStates}>
         {children}
      </AppStatesContext.Provider>
   );
}
