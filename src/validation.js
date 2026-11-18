// Shared validation rules for inline form feedback.
export function validateField(control){
  const value=control.value.trim();
  const label=control.dataset.label || 'this field';
  if(control.required && !value) return control.tagName==='SELECT' ? `Please select ${label.toLowerCase()}.` : `Please enter ${label.toLowerCase()}.`;
  if(value && control.type==='email' && control.validity.typeMismatch) return 'Enter a valid email address, such as name@example.com.';
  if(value && control.name==='phone' && (!/^[+\d\s()\-]+$/.test(value) || value.replace(/\D/g,'').length<10 || value.replace(/\D/g,'').length>15)) return 'Enter a valid phone number with 10 to 15 digits.';
  return '';
}
