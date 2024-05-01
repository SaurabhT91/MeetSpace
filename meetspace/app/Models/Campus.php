<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Room;

class Campus extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'meeting_rooms', 'user_id', 'available', 'open_time', 'close_time'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
