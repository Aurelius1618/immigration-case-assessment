// pages/api/leads/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateRequest } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow PATCH method for updating lead status
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authenticate the request
  const authResult = authenticateRequest(req);
  if (!authResult.authenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the lead ID from the URL
  const { id } = req.query;
  
  // Get the new status from the request body
  const { status } = req.body;
  
  // Validate the status
  if (status !== 'PENDING' && status !== 'REACHED_OUT') {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  // In a real app, you would update the lead in your database
  // For this mock implementation, just return success
  
  return res.status(200).json({ 
    message: 'Lead status updated successfully',
    leadId: id,
    status: status
  });
}
