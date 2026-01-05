type Project = {
	title: string;
	description: string;
	url?: string;
	repository?: string;
	playStoreURL?: string;
	appStoreURL?: string;
	img?: string;
	testimonials?: {
		name: string;
		date: string;
		text: string;
	}[];
	slug?: string;
	published?: boolean;
	dateEnd?: string;
	dateStart?: string;
};

export default Project;
