import type { IconType } from "react-icons/lib";
export type SocialMediaDetails = {
	icon: IconType;
	url: string;
};

export type ContactDetails = {
	company: string;
	address: string;
	pobox: string;
	emirate: string;
	country: string;
	email: string;
	phone: string;
	socialMedia: SocialMediaDetails[];
	tradeLicenseNumber: string;
	taxRegistrationNumber: string;
};
