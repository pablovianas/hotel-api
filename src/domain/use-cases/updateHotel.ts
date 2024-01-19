import { Hotel } from '../entities/hotel';

export interface UpdateHotel {
  execute(hotelId: number, hotel: Hotel): Promise<Hotel | null>;
}
