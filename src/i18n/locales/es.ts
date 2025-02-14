
import { navigation } from './es/navigation';
import { landing } from './es/landing';
import { tenders } from './es/tenders';
import { handling } from './es/handling';
import { fleet } from './es/fleet';
import { common } from './es/common';
import { auth } from './es/auth';
import { support } from './es/support';
import { trips } from './es/trips';
import { footer } from './es/footer';

export const es = {
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
