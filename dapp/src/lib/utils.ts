import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  // Remove HTML tags
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Decode HTML entities in a string
 * Works in both browser and Node.js environments
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  // Check if we're in browser environment
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  // Fallback for server environment (basic entity decoding)
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Strip HTML tags and decode HTML entities from a string
 * Works in both browser and Node.js environments
 */
export function stripHtmlAndDecode(html: string): string {
  const textWithoutTags = stripHtml(html);
  return decodeHtmlEntities(textWithoutTags);
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  const stripped = stripHtmlAndDecode(text);
  if (!stripped) return '';
  return stripped.length > maxLength ? stripped.substring(0, maxLength) + '...' : stripped;
}

