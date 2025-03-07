
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import ConfirmationPage from './ConfirmationPage';


interface LeadFormData {
    firstName: string;
    lastName: string;
    email: string;
    visaCategories: string[];
    immigrationGoals: string;
    resume: FileList;
    [key: string]: any; 
  }


const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>();
  
  const onSubmit = async (data: LeadFormData) => {
   
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'resume') {
        formData.append('resume', data.resume[0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    
    const response = await fetch('/api/leads', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      setIsSubmitted(true);
    }
  };
  
  if (isSubmitted) {
    return <ConfirmationPage />;
  }
  
  return (
    <FormContainer>
        <Header>
        
        <CircleDecoration />
        <CircleDecorationSmall />
        <Logo>almă</Logo>
        <FormTitle>Get An Assessment Of Your Immigration Case</FormTitle>
        </Header>

        <FormContent>

        <FormIntro>
        <FormIcon>📄</FormIcon>
        <h2>Want to understand your visa options?</h2>
        <IntroText>
          Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
        </IntroText>
      </FormIntro>
      
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input 
            placeholder="First Name" 
            {...register('firstName', { required: true })} 
          />
          {errors.firstName && <ErrorMessage>First name is required</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input 
            placeholder="Last Name" 
            {...register('lastName', { required: true })} 
          />
          {errors.lastName && <ErrorMessage>Last name is required</ErrorMessage>}
        </InputGroup>

        <InputGroup>
  
           <Input 
         placeholder="Email" 
         type="email"
         {...register('email', { 
          required: true,
           pattern: /^\S+@\S+\.\S+$/
     })} 
     />
    {errors.email && <ErrorMessage>Valid email is required</ErrorMessage>}

</InputGroup>


<InputGroup>
  <select
    {...register('country', { required: true })}
    defaultValue=""
    style={{
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem'
    }}
  >
    <option value="" disabled>Country of Citizenship</option>
    <option value="Mexico">Mexico</option>
    <option value="Brazil">Brazil</option>
    <option value="South Korea">South Korea</option>
    <option value="Russia">Russia</option>
    <option value="France">France</option>
    <option value="Other">Other</option>
  </select>
  {errors.country && <ErrorMessage>Country is required</ErrorMessage>}
</InputGroup>

<InputGroup>
  <Input 
    placeholder="LinkedIn / Personal Website URL" 
    {...register('linkedin')} 
  />
</InputGroup>

<InputGroup>
  <SectionTitle>Resume / CV</SectionTitle>
  <Input 
    type="file" 
    {...register('resume', { required: true })} 
  />
  {errors.resume && <ErrorMessage>Resume is required</ErrorMessage>}
</InputGroup>
        
        
        
        
<FormSection>
        <FormIcon>📋</FormIcon>
  <SectionTitle>Visa categories of interest?</SectionTitle>
  <CheckboxGroup>
    <Checkbox {...register('visaCategories')} value="O-1" id="o1" />
    <label htmlFor="o1">O-1</label>
  </CheckboxGroup>
  <CheckboxGroup>
    <Checkbox {...register('visaCategories')} value="EB-1A" id="eb1a" />
    <label htmlFor="eb1a">EB-1A</label>
  </CheckboxGroup>
  <CheckboxGroup>
    <Checkbox {...register('visaCategories')} value="EB-2 NIW" id="eb2niw" />
    <label htmlFor="eb2niw">EB-2 NIW</label>
  </CheckboxGroup>
  <CheckboxGroup>
    <Checkbox {...register('visaCategories')} value="I don't know" id="dontknow" />
    <label htmlFor="dontknow">I don't know</label>
  </CheckboxGroup>
  </FormSection>

        
  <FormSection>
        <FormIcon>💬</FormIcon>
          <SectionTitle>How can we help you?</SectionTitle>
          <TextArea 
            placeholder="What is your current immigration history? Are you applying for a visa? What are your goals?" 
            {...register('immigrationGoals')}
          />
        </FormSection>
        
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      </FormContent>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  background-color: #fff;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  background-color:rgb(199, 210, 158); 
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CircleDecoration = styled.div`
  position: absolute;
  left: -50px;
  bottom: -100px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(180, 210, 100, 0.5);
  z-index: 1;
`;

const CircleDecorationSmall = styled.div`
  position: absolute;
  left: 0;
  bottom: -50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(180, 210, 100, 0.7);
  z-index: 2;
`;

const FormIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const FormContent = styled.div`
  padding: 2rem;
`;

const FormIntro = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const IntroText = styled.p`
  margin-bottom: 2rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;


const Logo = styled.div`
  font-size: 1.2rem; 
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 6rem; 
  position: relative;
  z-index: 3;
`;

const FormTitle = styled.h1`
  font-size: 2.5rem; 
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
  margin-left: 6rem; 
  position: relative;
  z-index: 3;
  max-width: 450px; 
  line-height: 1.2; 
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const VisaCategories = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

const TextAreaGroup = styled.div`
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const FormSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  background-color: #222;
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  display: block;
`;


export default LeadForm;
