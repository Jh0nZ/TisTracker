<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicPeriod;

class AcademicPeriodsTableSeeder extends Seeder
{
    public function run()
    {
        AcademicPeriod::create([
            'id' => 19,
            'name' => 'Primer Semestre 2024',
            'start_date' => '2024-01-01',
            'end_date' => '2024-06-30',
            'description' => 'Este es el primer semestre del año académico 2024',
            'user_id' => 5, // Docente BORIS MARCELO CALANCHA NAVIA
        ]);
    }
}
