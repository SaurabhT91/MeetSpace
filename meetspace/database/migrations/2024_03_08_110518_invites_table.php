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

        Schema::create('invites_table', function (Blueprint $table) {
            $table->id();
            $table->foreignID('user_id')->constrained()->cascadeOnDelete();
            $table->string('senders_name');
            $table->string('receivers_name');
            $table->string('receivers_email');
            $table->integer('invite_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invites_table');
    }
};
