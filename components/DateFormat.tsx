type DateString = {
  dateString: string | number | Date;
};

export default function DateFormat({ dateString }: DateString) {
  const dateTime = new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return dateTime;
}
