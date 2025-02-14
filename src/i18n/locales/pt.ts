
import { navigation } from './pt/navigation';
import { landing } from './pt/landing';
import { tenders } from './pt/tenders';
import { handling } from './pt/handling';
import { fleet } from './pt/fleet';
import { common } from './pt/common';
import { auth } from './pt/auth';
import { footer } from './pt/footer';

export const pt = {
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
