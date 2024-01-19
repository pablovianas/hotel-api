import { RoomRepository } from "../../../infra/repositories/IRoomRepository";
import { BookRoomImpl } from "./bookRoomImpl";
import { pool } from "../../../infra/adapters/db";
import { Reservation } from "../../entities/reservation";

describe('Book Room', () => {

  afterAll(()=>{
    pool.end();
  })

  it('should call rooomRepository.bookRoom with correct values', async () => {
    const roomRepository = new RoomRepository();
    const sut = new BookRoomImpl(roomRepository);
    roomRepository.bookRoom = jest.fn();
    const hotelId = 1;
    const reservation: Reservation = {
      id: 7,
      hotel_id: hotelId,
      room_number: 11,
      start_date: '2021-01-01',
      end_date: '2021-01-02'
    };
    await sut.execute(hotelId, reservation);
  
    expect(roomRepository.bookRoom).toHaveBeenCalledWith(hotelId, reservation);
  })
})