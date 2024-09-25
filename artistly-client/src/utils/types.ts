// Models
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

export type FreeClient = {
  clientName: string;
  clientTag: string;
  clientDescription: string;
  clientRating: number;
  facebook: string;
  youtube: string;
  tiktok: string;
  instagram: string;
  youtubeLinks: string[];
  eventDetails: string;
  location: string;
  extendedReviews: ExtendedRating;
  minifiedReviews: MinifiedReview[];
};

export type PremiumClient = {
  prices: PricesModel[];
  contactName: string;
  contactType: string;
  contactNumber: string;
  contactEmail: string;
} & FreeClient;

export type ClientFilter = {
  name?: string;
  service?: string;
  location?: string;
  rating?: number;
  subcategoryId: string;
};

export type PricesModel = {
  title: string;
  description: string;
  ammount: number;
  currency: string;
};

export type ExtendedRating = {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
};

export type User = {
  firstName: string;
  lastName: string;
  newsletterEnabled?: boolean;
};

export type MinifiedReview = {
  name: string;
  dateAdded: string;
  title: string;
  review: string;
  rating: number;
};

export type SubmitReviewBody = {
  rating: number;
  title: string;
  body: string;
};

export type Category = {
  to: string;
  categoryId: string;
  categoryName: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  subcategoryId: string;
  subcategoryName: string;
};

// Authentication
export type SignIn = {
  email: string | undefined;
  password: string | undefined;
};

export type SignUp = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
} & SignIn;

export type RequestUserModel = {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
  category: string;
  subcategory: string;
  genre?: string;
};

// Clients

// Reviews and Requests

// Navigation
export type NavLinkProps = {
  svg?: React.ReactNode;
  text?: string;
};

// Post/Page
export type PostPage = {
  category: string;
  subcategory: string;
  handler: string;
  genre?: string;
  name: string;
  description: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  location: string;
  eventDetails?: string;
  contactType: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string;
  youtubeLinks: string[];
  prices: PricesModel[];
};
