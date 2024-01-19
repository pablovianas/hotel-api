import { pool } from '../adapters/db';
import { Hotel } from '../../domain/entities/hotel';
import { ResultSetHeader } from 'mysql2';

export class HotelRepository {
  async createHotel(hotel: Hotel): Promise<Hotel> {
    const result = await pool.query(
      'INSERT INTO hotels (name, address, rooms_available, rooms_booked) VALUES (?, ?, ?, ?)',
      [hotel.name, JSON.stringify(hotel.address), hotel.rooms_available, hotel.rooms_booked]
    );
    const insertId = (result[0] as ResultSetHeader).insertId;

    return { id: insertId, ...hotel };
  }

  async updateHotel(hotelId: number, hotel: Hotel): Promise<Hotel | null> {
    const result = await pool.query(
      'UPDATE hotels SET name=?, address=?, rooms_available=?, rooms_booked=? WHERE id=?',
      [hotel.name, JSON.stringify(hotel.address), hotel.rooms_available, hotel.rooms_booked, hotelId]
    );

    const okPacket = result[0] as ResultSetHeader

    if (okPacket.affectedRows > 0) {
      return { id: hotelId, ...hotel };
    }

    return null;
  }
}
