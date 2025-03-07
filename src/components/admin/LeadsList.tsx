
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    submittedAt: string;
    status: 'PENDING' | 'REACHED_OUT';
    country: string;
  }

const LeadsList = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  useEffect(() => {
    const fetchLeads = async () => {

        if (!user) return;

      const response = await fetch('/api/leads', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setFilteredLeads(data);
      }
    };
    
    if (user) {
      fetchLeads();
    }
  }, [user]);
  
  const handleStatusChange = async (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => {

    if (!user) return;

    const response = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    
    // if (response.ok) {
    //   setLeads(leads.map(lead => 
    //     lead.id === leadId ? { ...lead, status: newStatus } : lead
    //   ));
    // }

    if (response.ok) {
        const updatedLeads = leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        );
        setLeads(updatedLeads);
        setFilteredLeads(updatedLeads); 
      }
      
  };
  
 
  
  return (
    <AdminContainer>
      <SideNav>
  <div>
    <Logo>almă</Logo>
    <NavItem active>Leads</NavItem>
    <NavItem>Settings</NavItem>
  </div>
  <AdminProfile>
    <AdminCircle>A</AdminCircle>
    <AdminText>Admin</AdminText>
  </AdminProfile>
</SideNav>

      
      <MainContent>
        <Header>Leads</Header>
        
        <FilterBar>
          <SearchInput 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StatusFilter 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </StatusFilter>
        </FilterBar>
        
        <LeadsTable>
          <TableHeader>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Submitted</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Country</HeaderCell>
          </TableHeader>
          
          <TableBody>
            {filteredLeads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
                <TableCell>{new Date(lead.submittedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={lead.status}>
                    {lead.status=== 'PENDING' ? 'Pending' : 'Reached Out'}
                  </StatusBadge>
                  {lead.status === 'PENDING' && (
                    <StatusButton 
                      onClick={() => handleStatusChange(lead.id, 'REACHED_OUT')}
                    >
                      Mark as Reached Out
                    </StatusButton>
                  )}
                </TableCell>
                <TableCell>{lead.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </LeadsTable>
        
        <Pagination>
          <PaginationButton disabled>&lt;</PaginationButton>
               <PaginationNumber active>1</PaginationNumber>
               <PaginationNumber>2</PaginationNumber>
              <PaginationNumber>3</PaginationNumber>
           <PaginationButton>&gt;</PaginationButton>
        </Pagination>

      </MainContent>
    </AdminContainer>
  );
};


const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  width: 250px;
  background: linear-gradient(to bottom,rgb(242, 242, 189) 0%, rgba(249, 249, 224, 0.49) 50%);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const AdminProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const AdminCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const AdminText = styled.div`
  font-weight: 500;
`;



const Logo = styled.div`
  font-family: Arial;
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const NavItem = styled.div<{ active?: boolean }>`
  font-family: Arial;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
`;

const Header = styled.h1`
  font-family: Arial;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  flex: 0.7;
  max-width: 300px;
`;

const StatusFilter = styled.select`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 12px;
`;

const LeadsTable = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: #f9f9f9;
  padding: 1rem;
  font-weight: bold;
`;



const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &::after {
    content: '↓';
    margin-left: 0.5rem;
    font-size: 0.75rem;
    opacity: 0.5;
  }
`;


const TableBody = styled.div``;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const TableCell = styled.div``;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.status === 'PENDING' ? '#FEF3C7' : '#DCFCE7'};
  color: ${props => props.status === 'PENDING' ? '#92400E' : '#166534'};
  margin-right: 0.5rem;
`;

const StatusButton = styled.button`
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  border: 1px solid #ddd;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const PaginationNumber = styled.button<{ active?: boolean }>`
  border: 1px solid ${props => props.active ? '#000' : '#ddd'};
  background: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#000'};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
`;



export default LeadsList;
