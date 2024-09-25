export type PageCreateInputs = {
    category: string;
    subcategory: string;
    musicGenre?: string;
    fullName: string;
    handler: string;
    description: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    eventDetails?: string;
    prices: {
      title: string;
      description: string;
      ammount: number;
      currency: string;
    }[];
    mediaSlots: {
      image: FileList | null;
      youtubeLink: string | null;
    }[];
    ContactName: string;
    ContactPhone: string;
    ContactEmail: string;
    ContactType: string;
  
    profilePicture: Blob | null;
    coverPicture: Blob | null;
  
    tos: boolean;
    gdpr: boolean;
  };