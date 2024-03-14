<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    public function login(Request $request){

        $email = $request->email;
        $password = $request->password;

        Log::info($request);

        if($email && $password){
        return http_response_code(200);
        }
        else{
            return http_response_code(404);
        }
    }
}
