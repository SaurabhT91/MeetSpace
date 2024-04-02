<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                "campuses_id" => "1",
                "room_name" => "Beleriand",
                "room_charges" => "0",
                "room_capacity" => "15",
            ],
            [
                "campuses_id" => "1",
                "room_name" => "Eriador",
                "room_charges" => "0",
                "room_capacity" => "10",
            ],
            [
                "campuses_id" => "1",
                "room_name" => "Rhovanion",
                "room_charges" => "0",
                "room_capacity" => "5",
            ],
            [
                "campuses_id" => "1",
                "room_name" => "Rhûn",
                "room_charges" => "0",
                "room_capacity" => "25",
            ],
            [
                "campuses_id" => "1",
                "room_name" => "Harad",
                "room_charges" => "0",
                "room_capacity" => "20",
            ],
            [
                "campuses_id" => "2",
                "room_name" => "Dragonstone",
                "room_charges" => "0",
                "room_capacity" => "20",
            ],
            [
                "campuses_id" => "2",
                "room_name" => "Winterfell",
                "room_charges" => "0",
                "room_capacity" => "15",
            ],
            [
                "campuses_id" => "2",
                "room_name" => "Highgarden",
                "room_charges" => "0",
                "room_capacity" => "10",
            ],
            [
                "campuses_id" => "2",
                "room_name" => "Eyire",
                "room_charges" => "0",
                "room_capacity" => "5",
            ],
            [
                "campuses_id" => "2",
                "room_name" => "Riverrun",
                "room_charges" => "0",
                "room_capacity" => "3",
            ]

        ]);
    }
}
