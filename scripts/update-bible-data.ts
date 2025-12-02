import { addAbbreviationsToBibleData } from '@/app-data/add-bible-abbreviations';

const main = () => {
  try {
    addAbbreviationsToBibleData();

    console.log('Procesul de actualizare a fost finalizat cu succes!');
  } catch (error) {
    console.error('Eroare în timpul procesului de actualizare:', error);
    process.exit(1);
  }
};

main();
