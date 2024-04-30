<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * Create a new message instance.
     *
     * @param  array  $details
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $baseUrl = "https://meetspace.saurabhtidgam.in/registration";
        $token = $this->details['token'];
        $invitingTo = $this->details['invitingTo'];
        $subject = 'Welcome to Our Website MeetSpace';
        $content = '<h1>Welcome, ' . $this->details['name'] . '!</h1>';
        $content .= '<p>' . $this->details['content'] . '</p>';
        $content .= rtrim($baseUrl, '/') .'/'. $token . '&type=' . $invitingTo;
        $content .= '<p>Thank you for joining us.</p>';

        return $this->subject($subject)->html($content);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
