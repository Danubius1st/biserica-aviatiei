import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/*
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
*/

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const handycheeraRegular = localFont({
  src: '../public/assets/fonts/Handycheera/handycheera.regular.otf',
  variable: '--font-handycheera-regular',
  display: 'swap',
});

const garamondBold = localFont({
  src: '../public/assets/fonts/AGaramondPro/AGaramondPro-Bold.woff',
  variable: '--font-garamond-bold',
  display: 'swap',
});

const tangerineBold = localFont({
  src: '../public/assets/fonts/Tangerine/Tangerine-Bold.ttf',
  variable: '--font-tangerine-bold',
  display: 'swap',
});

const meriendaRegular = localFont({
  src: '../public/assets/fonts/Merienda/Merienda-Regular.ttf',
  variable: '--font-merienda-regular',
  display: 'swap',
});

const italiannoRegular = localFont({
  src: '../public/assets/fonts/Italianno/Italianno-Regular.ttf',
  variable: '--font-italianno-regular',
  display: 'swap',
});

const playwriteCARegular = localFont({
  src: '../public/assets/fonts/PlaywriteCA/PlaywriteCA-Regular.ttf',
  variable: '--font-playwriteCA-regular',
  display: 'swap',
});

export const fonts = {
  geistSans,
  geistMono,
  handycheeraRegular,
  garamondBold,
  tangerineBold,
  meriendaRegular,
  italiannoRegular,
  playwriteCARegular,
};
