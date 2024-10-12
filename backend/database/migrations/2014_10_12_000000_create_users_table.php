<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->default('');
            $table->string('last_name')->default('');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('academic_period_id')->nullable()->constrained()->onDelete('set null');
            $table->char('user_type', 1)->default('E')->after('email');
            $table->rememberToken();
            $table->timestamps();
        });
        // Schema::create('users', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('first_name');
        //     $table->string('last_name');
        //     $table->string('email')->unique();
        //     $table->string('password');
        //     $table->string('user_type');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
