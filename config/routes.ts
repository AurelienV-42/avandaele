type route = {
	name: string;
	href: string;
};

const routes: route[] = [
	{ name: "Me", href: "/me" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export default routes;
