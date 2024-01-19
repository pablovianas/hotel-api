import { ResultSetHeader } from "mysql2";
import { pool } from "../../../infra/adapters/db";
import { Reservation } from "../../entities/reservation";
import { BookRoom } from "../bookRoom";
import { RoomRepository } from "../../../infra/repositories/IRoomRepository";


export class BookRoomImpl implements BookRoom {

  constructor(
    private readonly roomRepository: RoomRepository) { }
    
  async execute(hotelId: number, reservation: Reservation): Promise<Reservation | null> {
    return this.roomRepository.bookRoom(hotelId, reservation);
  }
   
}