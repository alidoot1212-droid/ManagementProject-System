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
        Schema::table('tasks', function (Blueprint $table) {

            // حذف foreign key قبلی
            $table->dropForeign(['user_id']);

            // تغییر نام ستون
            $table->renameColumn('user_id', 'team_member_id');
        });

        Schema::table('tasks', function (Blueprint $table) {

            // ایجاد foreign key جدید
            $table->foreign('team_member_id')
                ->references('id')
                ->on('team_members')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {

            // حذف ارتباط جدید
            $table->dropForeign(['team_member_id']);

            // برگرداندن نام ستون
            $table->renameColumn('team_member_id', 'user_id');
        });

        Schema::table('tasks', function (Blueprint $table) {

            // برگرداندن ارتباط قبلی
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }
};
