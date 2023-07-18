const formatDay = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: 'numeric',
    minute: 'numeric'
});

const formatterDay = (date) => {
    return  formatDay.format(Date.parse(date))
}

export default formatterDay;