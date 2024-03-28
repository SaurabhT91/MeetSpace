<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([[
            'name' => 'Saurabh Tidgam',
            'email' => 'saurabhtidgam@gmail.com',
            'contact_number' => '9988783999',
            'address' => 'this is the default address',
            'user_type' => 'admin',
            'password' => Hash::make('passwordST91'),
        ],[
            'name' => 'Saurabh T',
            'email' => 'saurabhtidgam1991@gmail.com',
            'contact_number' => '9988783999',
            'address' => 'this is the default address',
            'user_type' => 'owner',
            'password' => Hash::make('passwordST91'),        
        ],[
            'name' => 'saurabh tidgam',
            'email' => 'saurabh@siddtech.com',
            'contact_number' => '9988783999',
            'address' => 'this is the default address',
            'user_type' => 'consumer',
            'password' => Hash::make('passwordST91'),        
        ]]);
    }
}
