import { preacher } from '@/models/preacher';
import { cloudinary } from '@/config/cloudinary';

export const preachers: preacher[] = [
  {
    id: 1,
    info: {
      name: 'Pavel Chirițescu',
      imageAddress: `${cloudinary}/biserica-aviatiei/2023.03.19_Pavel_Chiritzescu.jpg`,
      imageWidth: 2748,
      imageHeight: 1960,
      title: '',
      info: '',
    },
  },
  {
    id: 2,
    info: {
      name: 'Alan David Lines',
      imageAddress: `${cloudinary}/v1679234533/biserica-aviatiei/2023.03.19_Alan_Lines.jpg`,
      imageWidth: 2751,
      imageHeight: 1960,
      title: '',
      info: '',
    },
  },
  {
    id: 3,
    info: {
      name: 'Daniel Iosub',
      imageAddress: `${cloudinary}/v1678455220/biserica-aviatiei/2022.06.05_-_Dan_Iosub.jpg`,
      imageWidth: 5184,
      imageHeight: 3456,
      title: '',
      info: '',
    },
  },
  {
    id: 4,
    info: {
      name: 'Gabriel Achim',
      imageAddress: `${cloudinary}/v1678453344/biserica-aviatiei/2022.06.05_-_Gabriel_Achim.jpg`,
      imageWidth: 5184,
      imageHeight: 3456,
      title: '',
      info: '',
    },
  },
  {
    id: 5,
    info: {
      name: 'David Lucian Achim',
      imageAddress: `${cloudinary}/v1679240151/biserica-aviatiei/2023.03.19_David_Lucian.jpg`,
      imageWidth: 2973,
      imageHeight: 1960,
      title: '',
      info: '',
    }
  },
  {
    id: 6,
    info: {
      name: 'Cătălin Teodorescu',
      imageAddress: `${cloudinary}/v1753900423/biserica-aviatiei/2025.07.06_Catalin_Teodorescu.jpg`,
      imageWidth: 2973,
      imageHeight: 1960,
      title: '',
      info: '',
    }
  }
];
