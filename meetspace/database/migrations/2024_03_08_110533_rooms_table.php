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
        Schema::create('rooms_table', function (Blueprint $table) {
            $table->id();
            $table->foreignID('campus_information_id')->constrained()->cascadeOnDelete();
            $table->string('room_charges');
            $table->string('room_capacity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms_table');
    }
};
