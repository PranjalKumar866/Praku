/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Category = 'Video' | 'YouTube' | 'Reels' | 'Motion';

export interface Project {
  id: string;
  title: string;
  category: Category;
  image: string; // Thumbnail
  videoUrl?: string; // Video link
  description?: string;
  link?: string; // External link
}

export type ThemeMode = 'cinematic';

export interface ThemeConfig {
  bg: string;
  text: string;
  accent: string;
  cardBg: string;
  navBg: string;
}