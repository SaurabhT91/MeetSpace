<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CampusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('campuses')->insert([
            [
                'name' => 'Middle-earth',
                'user_id' => '2',
                'address' => 'duh, obviously middle-earth',
                'meeting_rooms' => '5'
            ],
            [
                'name' => 'Westeros',
                'user_id' => '2',
                'address' => 'Place where winter is coming',
                'meeting_rooms' => '5'

            ]
    ]);
    }
}
