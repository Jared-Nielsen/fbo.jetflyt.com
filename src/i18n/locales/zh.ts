
import { navigation } from './zh/navigation';
import { landing } from './zh/landing';
import { tenders } from './zh/tenders';
import { handling } from './zh/handling';
import { fleet } from './zh/fleet';
import { common } from './zh/common';
import { auth } from './zh/auth';
import { support } from './zh/support';
import { trips } from './zh/trips';
import { footer } from './zh/footer';

export const zh = {
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
