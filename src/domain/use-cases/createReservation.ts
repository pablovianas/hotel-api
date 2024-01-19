import { Reservation } from "../entities/reservation";

export interface createReservation {
  execute(reservation: Reservation): Promise<Reservation>;
}