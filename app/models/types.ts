import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  location?: string;
  interests?: string[];
  languages?: string[];
  createdAt: Date;
}

export interface Event {
  _id: ObjectId;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: 'cultural' | 'religious' | 'social' | 'educational';
  organizer: ObjectId; // User ID
  attendees?: ObjectId[]; // Array of User IDs
  image?: string;
  createdAt: Date;
}

export interface Resource {
  _id: ObjectId;
  title: string;
  description: string;
  category: 'business' | 'healthcare' | 'education' | 'legal' | 'housing';
  contact?: string;
  website?: string;
  location?: string;
  createdAt: Date;
}

export interface MarketplaceListing {
  _id: ObjectId;
  title: string;
  description: string;
  price: number;
  category: 'cultural' | 'food' | 'services' | 'general';
  seller: ObjectId; // User ID
  image?: string;
  status: 'available' | 'sold';
  createdAt: Date;
}

export interface SerializedMarketplaceListing {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: 'cultural' | 'food' | 'services' | 'general';
  seller: string;
  image?: string;
  status: 'available' | 'sold';
  createdAt: string;
}
