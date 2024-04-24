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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('loginToken')->accessToken;
            return response()->json(['success' => 'Login successful', 'user' => $user, 'accessToken' => $token], 200);
        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['error' => 'User not found. Check your email for a registration invite.'], 404);
            } else {
                return response()->json(['error' => 'Invalid password.'], 401);
            }
        }
    }


    public function users(Request $request, $user_type){
        
        if($user_type == 'admins'){
            $type_code= 'admin';
        }
        elseif($user_type == 'owners') {
            $type_code = 'owner';
        }
        elseif($user_type == 'consumer'){
            $type_code = 'consumer';
        }
        else{
            return response()->json(['error' => 'Not a registered user type'], 404);
        }
        
        // $data  = User::all();
        if(User::where('id', $request->id)->first()){
            $data = User::where('user_type', $type_code)->get();
        }

        return response()->json($data);
        



    }
}
