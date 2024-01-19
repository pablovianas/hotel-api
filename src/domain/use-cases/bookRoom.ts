import { Reservation } from '../entities/reservation';

export interface BookRoom {
  execute(hotelId: number, reservation: Reservation): Promise<Reservation | null>;
}