type DateString = {
  dateString: string;
};

export default function DateFormat({ dateString }: DateString) {
  const dateTime = new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }); //@ts-ignore
  return dateTime;
}
