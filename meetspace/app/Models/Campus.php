<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Campus extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'meeting_rooms','user_id'];

    public function campus()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function room()
    {
        return $this->hasMany(Room::class);
    }
}
