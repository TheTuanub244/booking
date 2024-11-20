export const formatDatesDayAndMonth = (date) => {
    const options = { month: 'short', day: 'numeric' };
    const dateFormatted = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    return dateFormatted;
  }; //Nov -6