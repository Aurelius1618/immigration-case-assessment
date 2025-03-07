// pages/api/leads/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseForm } from '../../../utils/form-parser';
import { validateLeadData } from '../../../utils/validation';
import { authenticateRequest } from '../../../utils/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      
      // Validate form data
      const validationResult = validateLeadData(fields);
      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.errors });
      }
      
      // In a real app, save to database
      // For mock, we'll just return success
      return res.status(201).json({ 
        message: 'Lead created successfully',
        leadId: `lead_${Date.now()}`
      });
    } catch (error) {
      console.error('Error processing form:', error);
      return res.status(500).json({ error: 'Failed to process form submission' });
    }
  } else if (req.method === 'GET') {
    // Authenticate admin request
    const authResult = authenticateRequest(req);
    if (!authResult.authenticated) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Mock data for leads list
    const mockLeads = [
      {
        id: 'lead_1',
        firstName: 'Jorge',
        lastName: 'Ruiz',
        email: 'jorge@example.com',
        country: 'Mexico',
        status: 'PENDING',
        submittedAt: '2024-12-06T14:45:00Z',
      },
      {
        id: 'lead_2',
        firstName: 'Bahar',
        lastName: 'Zamir',
        email: 'bahar@example.com',
        country: 'Mexico',
        status: 'PENDING',
        submittedAt: '2024-01-21T14:21:00Z',
      },
      {
        id: 'lead_3',
        firstName: 'Mary',
        lastName: 'Lopez',
        email: 'mary@example.com',
        country: 'Brazil',
        status: 'PENDING',
        submittedAt: '2024-06-14T14:08:00Z',
      },
      {
        id: 'lead_4',
        firstName: 'Li',
        lastName: 'Zijin',
        email: 'li@example.com',
        country: 'South Korea',
        status: 'PENDING',
        submittedAt: '2024-02-09T14:56:00Z',
      },
      {
        id: 'lead_5',
        firstName: 'Mark',
        lastName: 'Antonov',
        email: 'mark@example.com',
        country: 'Russia',
        status: 'PENDING',
        submittedAt: '2024-01-02T14:35:00Z',
      },
      {
        id: 'lead_6',
        firstName: 'Jane',
        lastName: 'Ma',
        email: 'jane@example.com',
        country: 'Mexico',
        status: 'PENDING',
        submittedAt: '2024-08-15T14:12:00Z',
      },
      {
        id: 'lead_7',
        firstName: 'Anand',
        lastName: 'Jain',
        email: 'anand@example.com',
        country: 'Mexico',
        status: 'REACHED_OUT',
        submittedAt: '2024-05-02T14:25:00Z',
      },
      {
        id: 'lead_8',
        firstName: 'Anna',
        lastName: 'Voronova',
        email: 'anna@example.com',
        country: 'France',
        status: 'PENDING',
        submittedAt: '2024-03-19T14:05:00Z',
      }
    ];
    
    return res.status(200).json(mockLeads);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
