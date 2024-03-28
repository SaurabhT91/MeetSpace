<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campus;
use App\Models\Room;

class BookMeetingRoomController extends Controller
{
    public function meetingRoomInfo(Request $request)
    {

        $campuses = Campus::all();
        $rooms = Room::all();

        $responseData = [
            'campuses' => $campuses,
            'rooms' => $rooms
        ];

        // Return response
        return response()->json($responseData, 200);
    }
}
