const getFormattedTime = (dateStr) => new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

const getFormattedShortDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-us', {
    month: "short",
    day: "numeric"
});

export {
    getFormattedTime,
    getFormattedShortDate
}