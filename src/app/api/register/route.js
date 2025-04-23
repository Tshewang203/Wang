// src/app/api/register/route.js

export async function POST(request) {
    try {
      const data = await request.json();
  
      const errors = [];
  
      // Server-side validation
      if (!data.fullName || data.fullName.trim() === '') {
        errors.push('Full Name is required.');
      }
  
      if (!data.studentId || !/^[a-zA-Z0-9]{8}$/.test(data.studentId)) {
        errors.push('Student ID must be 8 alphanumeric characters.');
      }
  
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format.');
      }
  
      if (!data.programme) {
        errors.push('Programme is required.');
      }
  
      if (!data.year) {
        errors.push('Year is required.');
      }
  
      if (!data.semester) {
        errors.push('Semester is required.');
      }
  
      if (!Array.isArray(data.modules) || data.modules.length < 3) {
        errors.push('At least 3 modules must be selected.');
      }
  
      if (errors.length > 0) {
        return new Response(JSON.stringify({ success: false, message: errors.join(' ') }), {
          status: 400,
        });
      }
  
      // Simulate storing data (log to console)
      console.log('Student registered:', data);
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: 'Server error.' }), {
        status: 500,
      });
    }
  }
  