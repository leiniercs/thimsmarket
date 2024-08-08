import type { ReactNode } from "react";

interface CustomComponentProps {
   children: ReactNode;
}

export function HeadingTitle({ children }: Readonly<CustomComponentProps>) {
   return <h1 className="text-lg font-bold">{children}</h1>;
}
