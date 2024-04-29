<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UserRegistrationController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:50', 'min:3'],
                'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique(User::class)],
                'contactNumber' => ['required', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10'],
                'address' => ['required', 'string', 'max:255', 'min:3'],
                'type' => ['required', 'string'],
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
                'type.in' => 'Type input was not valid',
            ]);

            // Creating user
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'contact_number' => $validatedData['contactNumber'],
                'address' => $validatedData['address'],
                'user_type' => $validatedData['type'],
                'password' => Hash::make($validatedData['password']),
            ]);

            
            $response = response()->json(['message' => 'User registered successfully'], 200);


            return $response;
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handling validation errors
            $errors = $e->validator->errors()->toArray();
            return response()->json(['error' => 'User registration failed', 'errors' => $errors], 400);
        } catch (\Exception $e) {
            // Logging and returning error response
            Log::error('User registration failed: ' . $e->getMessage());
            return response()->json(['error' => 'User registration failed', 'reason' => $e->getMessage()], 400);
        }
    }
}

