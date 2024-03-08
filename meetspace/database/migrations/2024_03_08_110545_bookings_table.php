<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings_table', function (Blueprint $table) {
            $table->id();
            $table->foreignID('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained('rooms_table')->cascadeOnDelete();
            $table->string('room_status');
            $table->integer('duration');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings_table');
    }
};
