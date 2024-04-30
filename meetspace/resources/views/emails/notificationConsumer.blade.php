<!-- resources/views/emails/notification.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            margin-bottom: 10px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 5px;
        }
        li strong {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Notification of Successful Booking</h1>
        <p>Hello, {{ $bookingData['userName'] }}</p>
        <p>Your booking details:</p>
        <ul>
            <li><strong>Campus Name:</strong> {{ $bookingData['campusName'] }}</li>
            <li><strong>Campus Address:</strong> {{ $bookingData['campusAddress'] }}</li>
            <li><strong>Room Name:</strong> {{ $bookingData['RoomName'] }}</li>
            <li><strong>Booking Date:</strong> {{ $bookingData['Date'] }}</li>
            <li><strong>Start Time:</strong> {{ $bookingData['startTime'] }}</li>
            <li><strong>End Time:</strong> {{ $bookingData['endTime'] }}</li>
        </ul>
    </div>
</body>
</html>
