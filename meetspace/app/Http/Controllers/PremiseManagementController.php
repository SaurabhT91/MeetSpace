<?php

namespace App\Http\Controllers;

use App\Models\Campus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use App\Models\Room;
use Illuminate\Support\Facades\Log;

class PremiseManagementController extends Controller
{

    public function addCampus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'premiseName' => ['required', 'string', 'min:3', 'max:50'],
            'premiseAddress' => ['required', 'string', 'min:3', 'max:255'],
            'rooms' => ['required', 'integer', 'min:1'],
        ], [
            'premiseName.required' => 'Name is required.',
            'premiseName.string' => 'Name should be a string.',
            'premiseName.min' => 'Name should contain minimum 3 characters.',
            'premiseName.max' => 'Name should contain maximum 50 characters.',

            'premiseAddress.required' => 'Address is required.',
            'premiseAddress.string' => 'Address should be a string.',
            'premiseAddress.min' => 'Address should contain minimum 3 characters.',
            'premiseAddress.max' => 'Address should contain maximum 255 characters.',

            'rooms.required' => 'Rooms is required.',
            'rooms.integer' => 'Rooms should be an integer.',
            'rooms.min' => 'Rooms should be at least 1.',
        ]);

        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $campus = Campus::create([
            'name' => $request->premiseName,
            'address' => $request->premiseAddress,
            'meeting_rooms' => $request->rooms,
            'user_id' => $request->id,
        ]);

        // Return success response
        return response()->json(['message' => 'Campus added successfully', 'id' => $campus->id], 200);
    }

    public function removeCampus(Request $request){

    }
    public function addRoom(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'campusName' => ['required', 'string'], // Validate campusName
            'rooms' => ['required', 'array'], // Ensure rooms array is present
            'rooms.*.roomName' => ['required', 'string', 'min:3', 'max:50'],
            'rooms.*.roomCapacity' => ['required', 'integer', 'min:1'],
            'rooms.*.roomCharges' => ['required', 'integer', 'min:0'],
        ], [
            'campusName.required' => 'Campus name is required.',
            'campusName.string' => 'Campus name should be a string.',
            'rooms.required' => 'Rooms data is required.',
            'rooms.array' => 'Rooms data should be an array.',
            'rooms.*.roomName.required' => 'Room name is required.',
            'rooms.*.roomName.string' => 'Room name should be a string.',
            'rooms.*.roomName.min' => 'Room name should contain minimum 3 characters.',
            'rooms.*.roomName.max' => 'Room name should contain maximum 50 characters.',
            'rooms.*.roomCapacity.required' => 'Room capacity is required.',
            'rooms.*.roomCapacity.integer' => 'Room capacity should be an integer.',
            'rooms.*.roomCapacity.min' => 'Room capacity should be at least 1.',
            'rooms.*.roomCharges.required' => 'Room charges is required.',
            'rooms.*.roomCharges.integer' => 'Room charges should be an integer.',
            'rooms.*.roomCharges.min' => 'Room charges should be at least 0.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the campus ID by premise name
        $campusName = $request->campusName;
        $campus = Campus::where('name', $campusName)->first();
        if (!$campus) {
            return response()->json(['errors' => 'Campus not found.'], 404);
        }
        $campusId = $campus->id;

        // Create rooms
        $rooms = [];
        foreach ($request->rooms as $roomData) {
            $room = Room::create([
                'room_name' => $roomData['roomName'],
                'room_capacity' => $roomData['roomCapacity'],
                'room_charges' => $roomData['roomCharges'],
                'campuses_id' => $campusId,
            ]);
            $rooms[] = $room;
        }

        return response()->json(['message' => 'Rooms added successfully', 'rooms' => $rooms], 200);
    }


    public function removeRoom(Request $request){

    }
}
