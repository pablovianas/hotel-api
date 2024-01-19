import { Room } from '../entities/room';

export interface CreateRoom {
  execute(hotelId: number, room: Room): Promise<Room>;
}
