<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campus;
use App\Models\Room;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Booking;

class BookMeetingRoomController extends Controller
{
    public function meetingRoomInfo()
    {

        $campuses = Campus::all();
        $rooms = Room::all();

        $responseData = [
            'campuses' => $campuses,
            'rooms' => $rooms
        ];
        return response()->json($responseData, 200);
    }

    public function bookingRequest(Request $request){

        Log::info($request);
        
        $validator = Validator::make($request->all(), [

            'roomsId' => ['required', 'string'], 
            'date' => ['required', 'date', 'min:3', 'max:50'],
            'startTime' => ['required', 'time'],
            'endTime' => ['required', 'time'],
            'duration' => ['required', 'integer'],
            'user.*.id' => ['required', 'string'],            
        ],
        [
            'roomsID.required' => 'Room ID is required',
            'date.required' => 'Select a Date for booking',
            'starTime.required' => 'Your meeting is starts at',
            'endTime.required' => 'Your meeting ends at',
            'duration.required' => 'Duration of meeting is required',
            'user.*.id.required' => 'User ID is required',
        ]);

        $checkClash = Booking::where('date', $request->date)->where('start_time', '>=', $request->startTime)->where('endTime', '<=', $request->endTime);
        
        if($checkClash){

            return response()->json(['message' => 'Sorry booking slot is not available']);

        }

        Booking::create([
            "user_id" => $request->user['id'],
            "room_id" => $request->roomId,
            "date" => $request->date,
            'start_time' => $request->startTime,
            'end_time' => $request->endTime,
            'duration' => $request->duration,
        ]);



        $data = Booking::where('user_id', $request->user['id'])->first();

        return response()->json(['message'=>'Booking created Successfully', 'Booking_data' => $data], 200);

    }

    public function bookingSchedule($id){

        $ldate = date('Y-m-d');
        $roomData = Booking::where('user_id', $id)->whereDate('date', '>=' , $ldate)->get();

        $campusData = [];
        foreach($roomData as $data){


            $temp = Room::where('id', '=', $data['room_id'])->get('campuses_id');
            $temp = $temp[0]['campuses_id'];
            $campusData[] =  Campus::where('id', $temp)->first();

        }


        return response()->json([$campusData, $roomData]);
    }
}
