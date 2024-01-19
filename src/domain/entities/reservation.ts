export interface Reservation {
  id?: number;
  hotel_id: number;
  room_number: number;
  start_date: string;
  end_date: string;
}