import { webDevelopmentCategory } from './web-development';
import { designCategory } from './design';
import { marketingCategory } from './marketing';
import { automationCategory } from './automation';
import { consultingCategory } from './consulting';
import { aiCategory } from './ai';
import { brandingCategory } from './branding';
import { CatalogCategoryRaw } from '../../types';

export const catalogDataRaw: readonly CatalogCategoryRaw[] = [
  webDevelopmentCategory,
  designCategory,
  marketingCategory,
  automationCategory,
  consultingCategory,
  aiCategory,
  brandingCategory,
] as const;
