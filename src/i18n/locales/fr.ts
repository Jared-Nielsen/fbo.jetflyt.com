
import { navigation } from './fr/navigation';
import { landing } from './fr/landing';
import { tenders } from './fr/tenders';
import { handling } from './fr/handling';
import { fleet } from './fr/fleet';
import { common } from './fr/common';
import { auth } from './fr/auth';
import { footer } from './fr/footer';

export const fr = {
  translation: {
    ...navigation,
    ...landing,
    ...tenders,
    ...handling,
    ...fleet,
    ...common,
    ...auth,
    ...footer
  }
};
