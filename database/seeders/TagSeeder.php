<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::insert([
            [
                'name' => 'فوری',
                'color_code' => '#FF0000',
            ],
            [
                'name' => 'در حال بررسی',
                'color_code' => '#FFA500',
            ],
            [
                'name' => 'نیازمند تایید',
                'color_code' => '#800080',
            ],
            [
                'name' => 'متوقف شده',
                'color_code' => '#808080',
            ],
            [
                'name' => 'تست',
                'color_code' => '#00BFFF',
            ],
            [
                'name' => 'توسعه',
                'color_code' => '#0000FF',
            ],
            [
                'name' => 'باگ',
                'color_code' => '#DC143C',
            ],
            [
                'name' => 'بهبود',
                'color_code' => '#28A745',
            ],
            [
                'name' => 'مستندات',
                'color_code' => '#6C757D',
            ],
            [
                'name' => 'جلسه',
                'color_code' => '#FFC107',
            ],
        ]);
    }
}
