<?php

// database/migrations/xxxx_xx_xx_create_procurements_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcurementsTable extends Migration
{
    public function up()
    {
        Schema::create('procurements', function (Blueprint $table) {
            $table->id();
            $table->string('procurement_no');
            $table->string('procurement_name');
            $table->string('budget_type');
            $table->string('budget_sub_type');
            $table->decimal('value', 15, 2);
            $table->date('procurement_date');
            $table->decimal('procurement_total', 15, 2);
            $table->unsignedBigInteger('created_by_user_id');
            $table->foreign('created_by_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('procurements');
    }
}
