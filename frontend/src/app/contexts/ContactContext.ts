import { createContext } from 'react';
import type { Contact } from '@/types/contactType';

export const ContactContext = createContext<Contact | null>(null);
