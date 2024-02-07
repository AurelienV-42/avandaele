type Project = {
  slug: string;
  locale: string;
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
  published?: boolean;
  dateEnd?: string;
  dateStart?: string;
};

export default Project;
