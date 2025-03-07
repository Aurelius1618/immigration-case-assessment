import React from 'react';
import styled from 'styled-components';

interface LeadStatusButtonProps {
  status: 'PENDING' | 'REACHED_OUT';
  leadId: string;
  onStatusChange: (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => void;
}

const LeadStatusButton = ({ status, leadId, onStatusChange }: LeadStatusButtonProps) => {
  if (status === 'PENDING') {
    return (
      <StatusContainer>
        <StatusBadge status={status}>Pending</StatusBadge>
        <ActionButton onClick={() => onStatusChange(leadId, 'REACHED_OUT')}>
          Mark as Reached Out
        </ActionButton>
      </StatusContainer>
    );
  }
  
  return (
    <StatusContainer>
      <StatusBadge status={status}>Reached Out</StatusBadge>
    </StatusContainer>
  );
};

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.status === 'PENDING' ? '#FEF3C7' : '#DCFCE7'};
  color: ${props => props.status === 'PENDING' ? '#92400E' : '#166534'};
  margin-right: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
`;

export default LeadStatusButton;
