<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    public function invite()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
