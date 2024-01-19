import { GetRooms } from '../getRooms';
import { Room } from '../../entities/room';
import { RoomRepository } from '../../../infra/repositories/IRoomRepository';

export class GetRoomsImpl implements GetRooms {

  constructor(
    private readonly roomRepository: RoomRepository) { }
  async execute(hotelId: number): Promise<Room[]> {
    return this.roomRepository.getRooms(hotelId);
  }
}