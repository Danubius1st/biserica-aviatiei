import { imageType } from '@/models/image';
import { cloudinary } from '@/config/cloudinary';

const assets = '/assets/images';

export const images: imageType[] = [
  {
    id: 0,
    src: `${assets}/Sistine-Chapel.webp`,
    alt: 'Capela Sixtină',
    width: 465,
    height: 390,
  },
  {
    id: 1,
    src: `${assets}/ancient-israel.jpg`,
    alt: 'Ancient Israel',
    width: 1000,
    height: 668,
  },
  {
    id: 2,
    src: `${assets}/The-Crucifixion-of-Jesus.webp`,
    alt: 'The Crucifixion of Jesus',
    width: 1000,
    height: 563,
  },
  {
    id: 3,
    src: `${cloudinary}/v1689508906/biserica-aviatiei/google-map.jpg`,
    alt: 'Google map',
    width: 1020,
    height: 374,
  },
  {
    id: 4,
    src: `${cloudinary}/v1689510538/biserica-aviatiei/under-construction.jpg`,
    alt: 'Under construction',
    width: 624,
    height: 312,
  },
  {
    id: 5,
    src: assets + '/bcev-logo.png',
    alt: 'bcev',
    width: 125,
    height: 65,
  },
  {
    id: 6,
    src: `${cloudinary}/v1691256008/biserica-aviatiei/The-Thinker-Auguste-Rodin.png`,
    alt: 'The Thinker, by Auguste Rodin',
    width: 600,
    height: 600,
  },
  {
    id: 7,
    src: `${cloudinary}/v1691255889/biserica-aviatiei/Decalog.png`,
    alt: 'Tablele Legii',
    width: 548,
    height: 290,
  },
  {
    id: 8,
    src: `${cloudinary}/v1692711282/biserica-aviatiei/curious.png`,
    alt: 'curious',
    width: 652,
    height: 320,
  },
  {
    id: 9,
    src: `${cloudinary}/v1692712196/biserica-aviatiei/do-not-enter-authorized-only.png`,
    alt: 'Do not enter authorized only',
    width: 774,
    height: 552,
  },
  {
    id: 10,
    src: `${cloudinary}/v1758988801/biserica-aviatiei/Ancient-Israel-Civilization.webp`,
    alt: 'Ancient Israel Civilization',
    width: 1792,
    height: 1024,
  },
  {
    id: 11,
    src: `${assets}/logo-150-191.webp`,
    alt: 'Logo',
    width: 150,
    height: 191,
  }
];

// https://blurred.dev/
