'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  studentId: yup
    .string()
    .length(8, 'Student ID must be exactly 8 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Student ID should be alphanumeric')
    .required('Student ID is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  programme: yup.string().required('Programme is required'),
  year: yup.string().required('Year is required'),
  semester: yup.string().required('Semester is required'),
  modules: yup.array().min(3, 'At least 3 modules must be selected').required('Modules are required'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverMessage, setServerMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setServerMessage('Registration successful!');
        reset();
      } else {
        setServerMessage(result.message || 'Error occurred.');
      }
    } catch (error) {
      setServerMessage('Error occurred during registration.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input type="text" {...register('fullName')} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div>
        <label>Student ID</label>
        <input type="text" {...register('studentId')} />
        {errors.studentId && <p>{errors.studentId.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Programme</label>
        <select {...register('programme')}>
          <option value="BEIT">BE Information Technology </option>
          <option value="BESWE">BE Software Engneering </option>
          <option value="BECE">BE Civil</option>
          <option value="BEEE">BE Electical Engineering</option>
          <option value="BEECE">BE Electronics and Communication</option>
          <option value="BEA">BE Architecture </option>
          <option value="BEEG">BE Engineering Geology</option>
          <option value="BECE">BE Instrumrntation and Control</option>
        </select>
        {errors.programme && <p>{errors.programme.message}</p>}
      </div>

      <div>
        <label>Year</label>
        <select {...register('year')}>
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4</option>
        </select>
        {errors.year && <p>{errors.year.message}</p>}
      </div>

      <div>
        <label>Semester</label>
        <select {...register('semester')}>
          <option value="Semester I">Semester I</option>
          <option value="Semester II">Semester II</option>
        </select>
        {errors.semester && <p>{errors.semester.message}</p>}
      </div>

      <div>
        <label>Modules</label>
        <select multiple {...register('modules')} size="5">
          <option value="MATH101">MATH101</option>
          <option value="CPL102">CPL102</option>
          <option value="NWC203">NWC203</option>
          <option value="CTE204">CTE204</option>
          <option value="DIS201">DIS201</option>
        </select>
        {errors.modules && <p>{errors.modules.message}</p>}
      </div>

      <button type="submit">Register</button>

      {serverMessage && (
        <div className={`server-message ${serverMessage.includes('success') ? 'success' : 'error'}`}>
          {serverMessage}
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
