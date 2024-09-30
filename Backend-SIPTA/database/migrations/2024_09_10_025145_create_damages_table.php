<?php

// database/migrations/xxxx_xx_xx_create_damages_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDamagesTable extends Migration
{
    public function up()
    {
        Schema::create('damages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_item_id');
            $table->date('damage_date');
            $table->string('status')->default('damage'); // Status default saat damage
            $table->timestamp('resolved_date')->nullable(); // Tanggal penyelesaian
            $table->text('damage_description');
            $table->string('repair_status')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('created_by_user_id');
            $table->foreign('inventory_item_id')->references('id')->on('inventory_items');
            $table->foreign('created_by_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('damages');
    }
}
