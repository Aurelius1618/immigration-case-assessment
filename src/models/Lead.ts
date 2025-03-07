// models/Lead.ts
export enum LeadStatus {
    PENDING = 'PENDING',
    REACHED_OUT = 'REACHED_OUT'
  }
  
  export enum VisaCategory {
    O1 = 'O-1',
    EB1A = 'EB-1A',
    EB2NIW = 'EB-2 NIW',
    OTHER = 'OTHER'
  }
  
  export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedin?: string;
    country: string;
    visaCategories: VisaCategory[];
    immigrationGoals?: string;
    resumeUrl?: string;
    status: LeadStatus;
    submittedAt: string;
  }
  