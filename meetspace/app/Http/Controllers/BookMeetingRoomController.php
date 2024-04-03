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

    public function bookingRequest(Request $request)
    {

        // Log::info($request);

        $validator = Validator::make(
            $request->all(),
            [

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
            ]
        );


        $startTimeClash = Booking::whereDate('date', $request->date)
            ->where('room_id', '=', $request->roomId)
            ->where('start_time', '<', $request->endTime)
            ->where('end_time', '>', $request->startTime)
            ->first();

        $endTimeClash = Booking::whereDate('date', $request->date)
            ->where('room_id', '=', $request->roomId)
            ->where('start_time', '<', $request->endTime)
            ->where('end_time', '>', $request->startTime)
            ->first();
        if ($startTimeClash or $endTimeClash) {

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

        return response()->json(['message' => 'Booking created Successfully', 'Booking_data' => $data], 200);
    }

    public function bookingSchedule($id)
    {

        $ldate = date('Y-m-d');
        $bookingData = Booking::where('user_id', $id)->whereDate('date', '>=', $ldate)->get();

        $showData = [];
        foreach ($bookingData as $data) {

            $campusaddress =
            $temp = Room::where('id', '=', $data['room_id'])->get('campuses_id');
            $temp = $temp[0]['campuses_id'];
            $campusaddress = Campus::where('id', $temp)->get('address');
            $campusname = Campus::where('id', $temp)->get('name');
            $roomName = Room::where('id', '=', $data['room_id'])->get('room_name');
            $startTime = $data->start_time;
            $endTime = $data->end_time;
            $date = $data->date;

            array_push($showData, ['bookings' => ['address'=>$campusaddress[0]['address'], 'name'=>$campusname[0]['name'], 'room' => $roomName[0]['room_name'], 'startTime' => $startTime, 'endTime' => $endTime, 'date' => $date]]);

        }



        return response()->json([$showData]);
    }
}
