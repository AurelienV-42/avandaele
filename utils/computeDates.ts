export const formatDate = (date: string, locale: string): string => {
	return Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
	}).format(new Date(date));
};

export const monthsBetweenTwoDates = (dateStart: string, dateEnd: string) => {
	const start = new Date(dateStart);
	const end = new Date(dateEnd);
	const months = (end.getFullYear() - start.getFullYear()) * 12;
	return months + end.getMonth() - start.getMonth();
};

export const period = (
	dateStart: string | undefined,
	dateEnd: string | undefined,
	monthLabel: string,
	monthsLabel: string,
): string => {
	if (!dateStart || !dateEnd) return "";

	const nbMonths = monthsBetweenTwoDates(dateStart, dateEnd);
	return ` - ${nbMonths} ${nbMonths > 1 ? monthsLabel : monthLabel}`;
};
