
import { navigation } from './hi/navigation';
import { landing } from './hi/landing';
import { tenders } from './hi/tenders';
import { handling } from './hi/handling';
import { fleet } from './hi/fleet';
import { common } from './hi/common';
import { footer } from './hi/footer';

export const hi = {
  translation: {
    ...navigation,
    ...landing,
    ...tenders,
    ...handling,
    ...fleet,
    ...common,
    ...footer
  }
};
