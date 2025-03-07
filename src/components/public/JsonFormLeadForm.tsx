
import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

const JsonFormLeadForm = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const schema = {
    type: 'object',
    properties: {
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      email: { type: 'string', format: 'email', title: 'Email' },
      
    },
    required: ['firstName', 'lastName', 'email']
  };
  
  const uiSchema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/firstName'
      },
      
    ]
  };
  
  const handleSubmit = async () => {
    
    setIsSubmitted(true);
  };
  
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={formData}
        renderers={materialRenderers}
        onChange={({ data }) => setFormData(data)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
