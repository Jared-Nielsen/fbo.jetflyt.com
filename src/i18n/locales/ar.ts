
import { navigation } from './ar/navigation';
import { landing } from './ar/landing';
import { tenders } from './ar/tenders';
import { handling } from './ar/handling';
import { fleet } from './ar/fleet';
import { common } from './ar/common';
import { auth } from './ar/auth';
import { support } from './ar/support';
import { trips } from './ar/trips';
import { footer } from './ar/footer';

export const ar = {
  translation: {
    ...navigation,
    ...landing,
    ...tenders,
    ...handling,
    ...fleet,
    ...common,
    ...auth,
    ...support,
    ...trips,
    ...footer
  }
};
