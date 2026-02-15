/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Category = 'Video' | 'Design' | 'Photo';

export interface Project {
  id: string;
  title: string;
  category: Category;
  image: string;
  description?: string;
  link?: string;
}

export type ThemeMode = 'midnight' | 'light' | 'glass' | 'glow';

export interface ThemeConfig {
  bg: string;
  text: string;
  accent: string;
  cardBg: string;
  navBg: string;
}