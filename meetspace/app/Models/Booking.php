<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use App\Models\User;

class Booking extends Model
{
    use HasFactory;

    public function booking()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
