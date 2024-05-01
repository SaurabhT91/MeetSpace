<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Campus;
use App\Models\Booking;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['room_name', 'room_capacity', 'room_charges', 'campus_id', 'available', 'open_time', 'close_time'];

    public function campus()
    {
        return $this->belongsTo(Campus::class, 'campus_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
