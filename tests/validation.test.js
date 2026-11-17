import test from 'node:test';
import assert from 'node:assert/strict';
import { validateField } from '../src/validation.js';

const control = (properties = {}) => ({
  value: '', name: 'student', type: 'text', tagName: 'INPUT', required: false,
  dataset: { label: 'Student name' }, validity: { typeMismatch: false }, ...properties,
});

test('required fields explain what to enter or select', () => {
  assert.equal(validateField(control({ required: true })), 'Please enter student name.');
  assert.equal(validateField(control({ tagName: 'SELECT', required: true, dataset: {label:'Current class'} })), 'Please select current class.');
  assert.equal(validateField(control()), '');
});
test('email errors explain the expected format', () => {
  assert.match(validateField(control({ type: 'email', value: 'invalid', validity: {typeMismatch:true} })), /name@example\.com/);
  assert.equal(validateField(control({ type: 'email', value: 'name@example.com' })), '');
});
test('phone numbers require 10 to 15 digits and permitted characters', () => {
  const phone = properties => control({ name: 'phone', type: 'tel', ...properties });
  assert.match(validateField(phone({value:'123'})), /10 to 15 digits/);
  assert.match(validateField(phone({value:'123abc4567890'})), /10 to 15 digits/);
  assert.equal(validateField(phone({value:'+91 90312 03310'})), '');
});
