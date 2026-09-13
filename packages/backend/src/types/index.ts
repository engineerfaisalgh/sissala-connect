// User Types
export interface User {
  id: string;
  email?: string;
  phone: string;
  whatsapp_number?: string;
  full_name: string;
  password_hash: string;
  raw_community_name: string;
  normalized_community_name: string;
  is_active: boolean;
  phone_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: string;
  user_id: string;
  photo_url?: string;
  username: string;
  bio?: string;
  community: string;
  district?: string;
  region?: string;
  country: string;
  website?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  title: string;
  profession: string;
  bio?: string;
  experience_years?: number;
  service_area: string;
  is_available: boolean;
  hourly_rate?: number;
  currency?: string;
  verification_status: 'unverified' | 'pending' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  profession: string;
  community: string;
  budget_min: number;
  budget_max: number;
  currency: string;
  deadline: Date;
  status: 'draft' | 'published' | 'applications_open' | 'in_progress' | 'completed' | 'cancelled' | 'closed';
  created_at: Date;
  updated_at: Date;
}

export interface Organization {
  id: string;
  name: string;
  logo_url?: string;
  type: string;
  description?: string;
  community: string;
  website?: string;
  verification_status: 'unverified' | 'pending' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  created_at: Date;
}
