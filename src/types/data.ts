export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LinkData {
  url: string;
  createdAt: string;
  uniqueViews: number;
  totalViews: number;
  browsers: Record<string, number>;
  os: Record<string, number>;
  locations: Record<string, number>;
}

export interface LinkStore {
  loading: boolean;
  data?: LinkData;
}
