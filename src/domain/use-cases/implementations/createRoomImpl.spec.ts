import { RoomRepository } from "../../../infra/repositories/IRoomRepository";
import { Room } from "../../entities/room";
import { CreateRoomImpl } from "./createRoomImpl";

describe('Create Room', () => {
    it('should call createRoom with correct values', async () => {
      const roomRepository = new RoomRepository();
      const sut = new CreateRoomImpl(roomRepository);
      roomRepository.createRoom = jest.fn();
      const hotelId = 1;
      const room: Room = {
        id: 1,
        hotel_id: hotelId,
        room_number: 1,
        price: 100,
        status: "AVAILABLE"
      }
      await sut.execute(hotelId, room);
  
      expect(roomRepository.createRoom).toHaveBeenCalledWith(hotelId, room);
    })

    it('should throw error if room number is already taken', async () => {
      const roomRepository = new RoomRepository();
      const sut = new CreateRoomImpl(roomRepository);
      roomRepository.createRoom = jest.fn();
      const hotelId = 1;
      const room: Room = {
        id: 1,
        hotel_id: hotelId,
        room_number: 1,
        price: 100,
        status: "UNAVAILABLE"
      }

      await expect(() => sut.execute(hotelId, room)).rejects.toThrow();
  
    })
})