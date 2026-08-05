<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::insert([
            [
                'name' => 'پیش تعریف'
            ],
            [
                'name' => 'جاری'
            ],
            [
                'name' => 'معوق'
            ],
            [
                'name' => 'پایان یافته'
            ],
        ]);
    }
}
