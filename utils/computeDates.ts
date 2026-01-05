export const formatDate = (date: string) => {
	return Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
	}).format(new Date(date));
};

export const monthsBetweenTwoDates = (dateStart: string, dateEnd: string) => {
	const start = new Date(dateStart);
	const end = new Date(dateEnd);
	const months = (end.getFullYear() - start.getFullYear()) * 12;
	return months + end.getMonth() - start.getMonth();
};

export const period = (dateStart?: string, dateEnd?: string) => {
	if (!dateStart || !dateEnd) return "";

	const nbMonths = monthsBetweenTwoDates(dateStart, dateEnd);
	return ` - ${nbMonths} month${nbMonths > 1 ? "s" : ""}`;
};
