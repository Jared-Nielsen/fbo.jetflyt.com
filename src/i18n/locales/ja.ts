
import { navigation } from './ja/navigation';
import { landing } from './ja/landing';
import { tenders } from './ja/tenders';
import { handling } from './ja/handling';
import { fleet } from './ja/fleet';
import { common } from './ja/common';
import { auth } from './ja/auth';
import { support } from './ja/support';
import { trips } from './ja/trips';
import { footer } from './ja/footer';

export const ja = {
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
