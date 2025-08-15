import { ElementType } from 'react';

export interface Service {
  id: string;
  title: string;
  icon: ElementType;
  shortDescription: string;
  longDescription: string;
  details: string[];
}

export interface SubcategoryPlan {
  name: string;
  price: number;
  description: string;
}

// Raw types for modular data files before processing
export interface CatalogSubcategoryRaw {
  name: string;
  image: string;
  whatIsIt: string;
  whatIsItFor: string;
  howItHelps: string;
  productionTime?: string;
  price?: number | null;
  plans?: readonly SubcategoryPlan[];
}

export interface CatalogCategoryRaw {
  category: string;
  emoji: string;
  keyIndicators: readonly { label: string; value: string; }[];
  metrics: readonly CategoryMetric[];
  subcategories: readonly CatalogSubcategoryRaw[];
}


// Processed types used by the application
export interface CatalogSubcategory {
  name:string;
  price: number | null;
  description: string;
  productionTime: string;
  whatIsIt: string;
  whatIsItFor: string;
  howItHelps: string;
  image: string;
  plans?: readonly SubcategoryPlan[];
}

export interface CategoryMetric {
  label: string;
  value: string; // e.g., "85%"
  icon: 'trendingUp' | 'users' | 'target' | 'dollarSign';
}

export interface CatalogCategory {
  category: string;
  emoji: string;
  keyIndicators: readonly { label: string; value: string; }[];
  metrics: readonly CategoryMetric[];
  subcategories: CatalogSubcategory[];
}
