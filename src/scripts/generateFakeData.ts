import { ResultSetHeader } from "mysql2";
import { pool } from "../infra/adapters/db";

export const createDatabaseTables = async () => {
  const createHotelTableQuery = `
      CREATE TABLE IF not exists hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address JSON NOT NULL,
        rooms_available INT NOT NULL,
        rooms_booked INT NOT NULL
      );
    `
  const createRoomTableQuery = `
        CREATE TABLE IF not exists rooms (
          id INT AUTO_INCREMENT PRIMARY KEY,
          hotel_id INT NOT NULL,
          number INT NOT NULL,
          price INT NOT NULL,
          status ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL
      );
          
    `
  const createReservationTableQuery = `
        CREATE TABLE IF not exists reservations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          hotel_id INT NOT NULL,
          room_number INT NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL
        );
    `

    try {
      await pool.query(createHotelTableQuery);
    } catch (err) {
      console.error('Error creating hotel table:', err);
    }

    try {
      await pool.query(createRoomTableQuery);
    } catch (err) {
      console.error('Error creating room table:', err);
    }

    try {
      await pool.query(createReservationTableQuery);
    } catch (err) {
      console.error('Error creating reservation table:', err);
    }
  

}


export const generateFakeData = async () => {
 
  for (let i = 0; i < 2; i++) {
    const hotelName = `Hotel ${i + 1}`;
    const hotelAddress = {
      street: `Rua do Hotel ${i + 1}`,
      country: 'País do Hotel',
      zipcode: `1234${i + 1}`,
    };
    const roomsAvailable = 50;
    const roomsBooked = 0;

    const hotelResult = await pool.query(
      'INSERT INTO hotels (name, address, rooms_available, rooms_booked) VALUES (?, ?, ? , ?)',
      [hotelName, JSON.stringify(hotelAddress), roomsAvailable, roomsBooked]
    );

    const hotelInsertId = hotelResult[0] as ResultSetHeader;

    const hotelId = hotelInsertId.insertId;

    for (let j = 0; j < 10; j++) {
      const roomNumber = i * 10 + j + 1;
      const roomPrice = 80;
      const roomStatus = j % 2 === 0 ? 'AVAILABLE' : 'UNAVAILABLE';

      await pool.query(
        'INSERT INTO rooms (hotel_id, number, price, status) VALUES (?, ?, ?, ?)',
        [hotelId, roomNumber, roomPrice, roomStatus]
      );
    }
  }

  console.log('Fake data generated successfully');
};


