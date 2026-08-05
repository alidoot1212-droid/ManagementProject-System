<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Faker\Factory;


class TeamMemberSeeder extends Seeder
{

    public function run(): void
    {

        $faker = Factory::create('fa_IR');
        foreach (range(1, 50) as $item) {

            TeamMember::create([

                'name' => $faker->name(),
                'mobile' => '09' . $faker->numerify('#########'),
                'responsibility' => $faker->randomElement([
                    'برنامه نویس بک اند',
                    'برنامه نویس فرانت اند',
                    'طراح UI/UX',
                    'تستر',
                    'مدیر پروژه'
                ])

            ]);
        }
    }
}
