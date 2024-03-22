<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Incorrect password'], 401);
        }

        return response()->json(['message' => 'Login successful', 'user' => $user], 200);
    }
    public function users(Request $request,$user_type){
        
        if($user_type == 'admin'){
            $type_code=01;
        }
        elseif($user_type == 'owner') {
            $type_code = 02;
        }
        elseif($user_type == 'user'){
            $type_code = 03;
        }
        else{
            return response()->json(['error' => 'Not a registered user type'], 404);
        }
        

        if(Auth::check($request->user->id)){

        }
    

    }
}
