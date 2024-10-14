import type { ContactDetails } from "@/types/contact";
import {
	FaLinkedin,
	FaXTwitter,
	FaFacebook,
	FaInstagram,
	FaTelegram,
	FaWhatsapp
} from "react-icons/fa6";

export const contact: ContactDetails = {
	company: "SDL Platforms FZCO",
	address: "Building A1, Dubai Digital Park, Dubai Silicon Oasis",
	pobox: "342001",
	emirate: "Dubai",
	country: "United Arab Emirates",
	email: "contact@sdlplatforms.com",
	phone: "+971 (4) 228-5285",
	socialMedia: [
		{
			icon: FaLinkedin,
			url: "https://www.linkedin.com/company/sdlplatforms"
		},
		{ icon: FaXTwitter, url: "https://www.x.com/sdlplatforms" },
		{ icon: FaFacebook, url: "https://www.facebook.com/sdlplatforms" },
		{ icon: FaInstagram, url: "https://www.instagram.com/sdlplatforms" },
		{ icon: FaTelegram, url: "https://t.me/sdlplatforms" },
		{
			icon: FaWhatsapp,
			url: "https://whatsapp.com/channel/0029Van77Ev0QeabgNxQ4p00"
		}
	],
	tradeLicenseNumber: "44236",
	taxRegistrationNumber: "104457494300001"
};
