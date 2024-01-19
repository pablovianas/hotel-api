import { Room } from '../entities/room';

export interface GetRooms {
  execute(hotelId: number): Promise<Room[]>;
}