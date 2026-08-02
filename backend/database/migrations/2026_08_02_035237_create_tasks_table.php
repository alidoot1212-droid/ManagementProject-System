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
        Schema::create('tasks', function (Blueprint $table) {


            // کد وظیفه
            $table->id();

            // کد بلوک کار
            $table->foreignId('work_block_id')
                ->constrained('work_blocks')
                ->cascadeOnDelete();

            // نام وظیفه
            $table->string('name');

            // وزن وظیفه (۱ تا ۵)
            $table->unsignedTinyInteger('weight');

            // ارزش وظیفه (۱ تا ۵)
            $table->unsignedTinyInteger('value');

            // توضیحات
            $table->text('description')->nullable();

            // کد اولویت
            $table->foreignId('priority_id')
                ->constrained('priorities')
                ->cascadeOnDelete();

            // کد وضعیت
            $table->foreignId('status_id')
                ->constrained('statuses')
                ->cascadeOnDelete();

            // کد عضو تیم (مسئول وظیفه)
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // زمان تخصیص
            $table->dateTime('assigned_at');

            // موعد تحویل
            $table->dateTime('due_date');

            // زمان تحویل واقعی
            $table->dateTime('completed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
