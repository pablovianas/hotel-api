import { Hotel } from '../entities/hotel';

export interface CreateHotel {
  execute(hotel: Hotel): Promise<Hotel>;
}