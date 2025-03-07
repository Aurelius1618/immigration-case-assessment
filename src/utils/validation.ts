
export const validateLeadData = (data: any) => {
    const errors = [];
    
    if (!data.firstName) {
      errors.push('First name is required');
    }
    
    if (!data.lastName) {
      errors.push('Last name is required');
    }
    
    if (!data.email) {
      errors.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Email format is invalid');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  };
  
  