import { type BaseRecord } from '@refinedev/core';
import { type Category } from './category';

export interface BlogPost extends BaseRecord {
  id: string;
  title: string;
  content: string;
  category: Category;
  status: string;
  createdAt: string;
}
