<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationMail;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class InvitationController extends Controller
{
    public function sendInvite(Request $request)
    {
        $data = $request->user;
        $token = Str::random(40);

        $request->validate([
            'receivers_email' => ['required', 'string', 'email', 'max:255', 'unique:' . Invite::class],
            'receivers_name' => ['required', 'string', 'max:255', 'min:3'],
        ]);
        $invite = Invite::create([
            'user_id' => $data['id'],
            'senders_name' => $data['name'],
            'receivers_name' => $request->receivers_name,
            'receivers_email' => $request->receivers_email,
            'token' => $token,
        ]);

        $invitingTo = "consumer";
        if ($request->user_type == 'admin'){
            $invitingTo = 'owner';
        }
        
        $sender = User::where('id', $data['id'])->first();

        $details = [
            'name' => $request->receivers_name,
            'content' => 'This is an email to invite you to register to MeetSpace',
            'token' => $token,
            'invitingTo' => $invitingTo,
        ];

        try {
            Mail::to($request->receivers_email)->send(new RegistrationMail($details));
        } catch (\Exception $e) {
            // Log the error for further investigation
            Log::error('Failed to send email: ' . $e->getMessage());

            // Return an error response
            return response()->json(['message' => 'Failed to send email'], 500);
        }

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
