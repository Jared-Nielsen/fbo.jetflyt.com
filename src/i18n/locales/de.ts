
import { navigation } from './de/navigation';
import { landing } from './de/landing';
import { tenders } from './de/tenders';
import { handling } from './de/handling';
import { fleet } from './de/fleet';
import { common } from './de/common';
import { auth } from './de/auth';
import { support } from './de/support';
import { trips } from './de/trips';
import { footer } from './de/footer';

export const de = {
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
