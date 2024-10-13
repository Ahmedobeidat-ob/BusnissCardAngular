export interface BusinessCardsDTo {
  name: string;
  gender: string;
  dateOfBirth: string; // Use string to match the date format from the API
  email: string;
  phone: string;
  address: string;
  photo: string;
  createdAt: string; // You may want to handle this automatically in your backend
}
