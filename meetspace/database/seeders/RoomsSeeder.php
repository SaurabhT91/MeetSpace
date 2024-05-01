<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            [
                "campus_id" => "1",
                "room_name" => "Beleriand",
                "room_charges" => "0",
                "room_capacity" => "15",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "1",
                "room_name" => "Eriador",
                "room_charges" => "0",
                "room_capacity" => "10",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "1",
                "room_name" => "Rhovanion",
                "room_charges" => "0",
                "room_capacity" => "5",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "1",
                "room_name" => "Rhûn",
                "room_charges" => "0",
                "room_capacity" => "25",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "1",
                "room_name" => "Harad",
                "room_charges" => "0",
                "room_capacity" => "20",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "2",
                "room_name" => "Dragonstone",
                "room_charges" => "0",
                "room_capacity" => "20",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "2",
                "room_name" => "Winterfell",
                "room_charges" => "0",
                "room_capacity" => "15",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "2",
                "room_name" => "Highgarden",
                "room_charges" => "0",
                "room_capacity" => "10",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "2",
                "room_name" => "Eyire",
                "room_charges" => "0",
                "room_capacity" => "5",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ],
            [
                "campus_id" => "2",
                "room_name" => "Riverrun",
                "room_charges" => "0",
                "room_capacity" => "3",
                "available" => true,
                "open_time" => "09:00:00",
                "close_time" => "20:00:00",
            ]
        ]);
    }
}
