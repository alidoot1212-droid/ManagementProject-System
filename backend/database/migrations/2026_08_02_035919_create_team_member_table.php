<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_member', function (Blueprint $table) {
            $table->id();

            $table->foreignId('team_id')
                ->constrained('teams')
                ->cascadeOnDelete();

            $table->foreignId('team_member_id')
                ->constrained('team_members')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('responsibility_id')->nullable();

            $table->timestamps();

            $table->unique([
                'team_id',
                'team_member_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_member');
    }
};
