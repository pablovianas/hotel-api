import { Room } from "../../entities/room";
import { CreateRoom } from "../createRoom";
import { RoomRepository } from "../../../infra/repositories/IRoomRepository";

export class CreateRoomImpl implements CreateRoom {

  constructor(
    private readonly roomRepository: RoomRepository) { }
  async execute(hotelId: number, room: Room): Promise<Room> {
    if (room.status === "UNAVAILABLE") {
      throw new Error("Room is unavailable");
    }
    return this.roomRepository.createRoom(hotelId, room);
  }
}