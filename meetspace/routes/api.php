<?php

use App\Http\Controllers\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\UserRegistrationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login',[RegisteredUserController::class, 'login']);
Route::post('/sendInvite', [InvitationController::class, 'sendInvite']);
Route::post('/register', [UserRegistrationController::class, 'register']);
Route::post('/getUsers/{user_type}', [RegisteredUserController::class, 'users']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
