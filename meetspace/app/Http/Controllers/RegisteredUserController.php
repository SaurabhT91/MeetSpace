<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (Hash::check($request->password, $user->password)) {

            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        } else {

            return response()->json(['error' => 'Incorrect password'], 401);
        }
    }
}
