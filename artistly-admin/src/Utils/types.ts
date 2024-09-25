export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status?: string;
  categories?: string;
  pages?: string[];
  clientId?: string;
  newsletterActive: boolean;
};

export type Page = {
  name: string;
  pageCategories: string;
  description: string;
  eventDetails: string;
  contactName: string;
  clientTag?: string;
  contactNumber: string;
  contactEmail: string;
  location: string;
  prices: Price[];
} & User;

export type ClientCard = {
  listed: boolean;
  clientHandle: string;
  clientTag: string;
  clientName: string;
  clientDescription: string;
  clientRating: number;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
};

export type Price = {
  price: string;
  title: string;
  description: string;
};

export type Review = {
  reqId?: number | null;
  clientHandle: string;
  firstName: string;
  lastName: string;
  email: string;
  clientTag: string;
  clientName: string;
  reviewTitle: string;
  reviewBody: string;
  rating: number;
};
