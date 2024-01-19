export interface Room {
  id?: number;
  hotel_id?: number;
  number: number;
  price: number;
  status: 'AVAILABLE' | 'UNAVAILABLE';
}