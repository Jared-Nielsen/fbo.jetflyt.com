
import { navigation } from './en/navigation';
import { landing } from './en/landing';
import { tenders } from './en/tenders';
import { handling } from './en/handling';
import { fbo } from './en/fbo';
import { fleet } from './en/fleet';
import { common } from './en/common';
import { auth } from './en/auth';
import { support } from './en/support';
import { trips } from './en/trips';
import { footer } from './en/footer';

export const en = {
  translation: {
    ...navigation,
    ...landing,
    ...tenders,
    ...handling,
    ...fbo,
    ...fleet,
    ...common,
    ...auth,
    ...support,
    ...trips,
    ...footer
  }
};
