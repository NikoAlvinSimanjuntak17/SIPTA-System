<?php

// database/migrations/xxxx_xx_xx_create_pull_outs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePullOutsTable extends Migration
{
    public function up()
    {
        Schema::create('pull_outs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_item_id');
            $table->string('destination');
            $table->string('pull_out_proof')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('pull_out'); // Status default saat pull out
            $table->timestamp('returned_date')->nullable(); // Tanggal pengembalian
            $table->unsignedBigInteger('created_by_user_id');
            $table->foreign('inventory_item_id')->references('id')->on('inventory_items');
            $table->foreign('created_by_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pull_outs');
    }
}
