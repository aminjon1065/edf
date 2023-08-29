const formatDay = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: 'numeric',
    minute: 'numeric'
});

const formatterDay = (date) => {
    const parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
        console.warn('Invalid date:', date);
        return "Invalid date";
    }
    return formatDay.format(parsedDate);
};

export default formatterDay;
