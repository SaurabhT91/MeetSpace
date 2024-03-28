<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Campus;
use App\Models\Booking;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['room_name', 'room_capacity' , 'room_charges', 'campuses_id'];

    public function room()
    {
        return $this->belongsTo(Campus::class, 'campus_id');
    }
    public function booking()
    {
        return $this->hasMany(Booking::class, 'booking_id');
    }
}
