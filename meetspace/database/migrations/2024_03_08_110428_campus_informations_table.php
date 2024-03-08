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
        Schema::create('campus_informations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignID('user_id')->constrained()->onDelete('cascade');
            $table->string('address');
            $table->integer('meeting_rooms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campus_information');
    }


};
