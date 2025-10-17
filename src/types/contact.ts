import { ContactCategory } from './contactCategory';

export interface Contact {
  id: number;
  name: string;
  phone?: string;
  profilePhoto?: string;
  email?: string;
  address?: string;
  category: ContactCategory;
  favorite: boolean;
}
