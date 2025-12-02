import { stringRefParser } from '@/components/parser/string-ref-parser';

export const getBibleBookJsonRef = async (ref: string) => {
  const { abbrev } = stringRefParser(ref);
  const input = {
    book: abbrev,
  };

  console.log(ref);
  try {
    const response = await fetch('/api/bible-book-json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error('Error fetching from add-discrepancy-hint API');
    }

    const data = await response.json();
    return ref.replace(abbrev, data.book);
  } catch (error) {
    return Promise.reject(error);
  }
};
