export function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{3}-\d{3}-\d{4}$/;
  const regex2 = /^\d{11}$/;
  return regex2.test(phoneNumber) || regex.test(phoneNumber);
}

export function validateEmail(email) {
  const regex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  return regex.test(email);
}
