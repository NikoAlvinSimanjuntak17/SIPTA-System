<?php

// database/migrations/xxxx_xx_xx_create_loans_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_item_id');
            $table->string('borrower_name');
            $table->string('borrower_division');
            $table->date('loan_start_date');
            $table->date('loan_end_date');
            $table->string('status')->default('loan'); // Kolom status, default "loan"
            $table->string('loan_proof')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('created_by_user_id');
            $table->foreign('inventory_item_id')->references('id')->on('inventory_items');
            $table->foreign('created_by_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('loans');
    }
}
