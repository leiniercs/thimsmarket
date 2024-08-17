"use client";
import type { NavMenuItem } from "@/types/menu";
import { Link as UILink } from "@nextui-org/react";
import { Link as NavLink } from "@/components/common/navigation";

type CustomProps = { item: NavMenuItem };

export default function Link({ item }: Readonly<CustomProps>) {
	return (
		<UILink as={NavLink} href={item.href} size="lg" color="foreground">
			{item.name}
		</UILink>
	);
}
