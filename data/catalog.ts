import { CatalogCategory } from '../types';
import { catalogDataRaw } from './catalog/index';

export const catalogData: CatalogCategory[] = catalogDataRaw.map(cat => ({
  ...cat,
  subcategories: cat.subcategories.map(sub => {
    const finalSub = {
      description: `Solução de ${sub.name} para alavancar seu negócio.`,
      productionTime: 'A definir',
      price: null,
      ...sub,
    };

    if (sub.plans && sub.plans.length > 0) {
      finalSub.price = sub.plans[0].price;
    } else {
      finalSub.price = sub.price || null;
    }

    return finalSub;
  })
}));
