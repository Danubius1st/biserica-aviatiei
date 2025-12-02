import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidDomains() {
  const domains = [
    'aviatiei.ro',
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'aol.com',
    'icloud.com',
    'mail.com',
    'zoho.com',
    'protonmail.com',
    'gmx.com'
  ];

  if (process.env.NODE_ENV === 'development') {
    domains.push('example.com');
  }

  return domains;
};

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, ' ')  // Remove extra spaces
    .replace(/[^a-zA-Z\s'-]/g, '') // Remove non-alphabetic characters
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}
