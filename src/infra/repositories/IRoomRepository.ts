import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../adapters/db";
import { Room } from "../../domain/entities/room";
import { Reservation } from "../../domain/entities/reservation";
import * as amqp from 'amqplib';


export class RoomRepository {
  async createRoom(hotelId: number, room: Room){
      const result = await pool.query(
        'INSERT INTO rooms (hotel_id, number, price, status) VALUES (?, ?, ?, ?)',
        [hotelId, room.number, room.price, room.status]
      );

      const insertId = (result[0] as ResultSetHeader).insertId;

      return { id: insertId, ...room };
  }
  async getRooms(hotelId: number){
    const [rows] = await pool.query('SELECT id, hotel_id, number, price, status FROM rooms WHERE hotel_id = ?', [hotelId]);
    const rooms: Room[] = (rows as RowDataPacket[]).map(row => ({
      id: row.id,
      hotel_id: row.hotel_id,
      price: row.price,
      number: row.number,
      status: row.status
    }));
    
    return rooms;
  }

  async bookRoom(hotelId: number, reservation: Reservation){
  
    const isRoomAvailable = await this.isRoomAvailable(hotelId, reservation.room_number, reservation.start_date, reservation.end_date);

    console.log(hotelId)

    if (!isRoomAvailable) {
      return null; 
    }
   
    await pool.query(
      'INSERT INTO reservations (hotel_id, room_number, start_date, end_date) VALUES (?, ?, ?, ?)',
      [hotelId, reservation.room_number, reservation.start_date, reservation.end_date]
    );

    await this.updateRoomsAvailability(hotelId, reservation.room_number);

    await this.publishToRabbitMQ(reservation);

    console.log('Reserva registrada e mensagem enviada para RabbitMQ.');

    return reservation;

  }
  private async isRoomAvailable(hotelId: number, roomNumber: number, startDate: string, endDate: string): Promise<boolean> {
    const [rooms] = await pool.query(
      'SELECT * FROM rooms WHERE hotel_id=? AND number=? AND status="AVAILABLE"',
      [hotelId, roomNumber]
    );

    const result = rooms as RowDataPacket[];

    if (result[0]?.length === 0) {
      throw new Error(`Room number ${roomNumber} does not exist for hotel id ${hotelId}`);
    }
   
    const [rows] = await pool.query(
      'SELECT COUNT(*) AS count FROM reservations WHERE hotel_id=? AND room_number=? AND start_date <= ? AND end_date >= ?',
      [hotelId, roomNumber, endDate, startDate]
    );

    const res = JSON.parse(JSON.stringify(rows));

    const rowDataPacket = res[0] as RowDataPacket;

    const count = Number(rowDataPacket['count']);

    return count === 0;
  }
  private async updateRoomsAvailability(hotelId: number, roomNumber: number): Promise<void> {
    await pool.query(
      'UPDATE hotels SET rooms_available = rooms_available - 1, rooms_booked = rooms_booked + 1 WHERE id = ?',
      [hotelId]
    );
    await pool.query(
      'UPDATE rooms SET status = "UNAVAILABLE" WHERE hotel_id = ? AND number = ?', [hotelId, roomNumber]
    )
  }

  private async publishToRabbitMQ(reservation: Reservation): Promise<void> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'reservations';

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(reservation)));
  }
  

}