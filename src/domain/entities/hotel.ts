export interface Hotel {
  id?: number;
  name: string;
  address: {
    street: string;
    zipcode: string;
    country: string;
  };
  rooms_available: number;
  rooms_booked: number;
}