<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRegistrationController extends Controller
{
    public function register(Request $request){

        Log::info($request);

        $request->validate([
            'name' => ['required', 'string', 'max:50', 'min:3'],
            'email' => ['required', 'string', 'email:rfc,dns', 'max:255', 'unique:' . User::class],
            'contactNumber' => ['required', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10'],
            'address' => ['required', 'string', 'max:255', 'min:3'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ], [
            'name.required' => 'Name is required.',
            'name.string' => 'Name should be a string.',
            'name.min' => 'Name should contain minimum 3 characters.',

            'email.required' => 'Email is required.',
            'email.email' => 'Email is not in proper format.',
            'email.unique' => 'Email has already been taken.',

            'contactNumber.required' => 'Contact Number is required.',
            'contactNumber.regex' => 'Contact Number is not in proper format.',
            'contactNumber.min' => 'Contact Number should consist of at least 10 digits.',

            'address.required' => 'Address is required.',
            'address.string' => 'Address should be a string.',
            'address.min' => 'Address should contain minimum 3 characters.',

            'password.required' => 'Password is required.',
            'password.confirmed' => 'Passwords do not match.',
        ]);



        $user = User::create([
             'name' => $request->name,
            'email' => $request->email,
            'contact_number' => $request->contactNumber,
            'address' => $request->address,
            'password' => Hash::make($request->password),
       ]);
    }
    
}
