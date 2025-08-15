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