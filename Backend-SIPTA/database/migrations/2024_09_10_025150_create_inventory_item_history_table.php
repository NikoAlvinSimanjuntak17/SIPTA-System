<?php

// database/migrations/xxxx_xx_xx_create_inventory_item_history_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryItemHistoryTable extends Migration
{
    public function up()
    {
        Schema::create('inventory_item_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_item_id');
            $table->enum('action_type', ['loan', 'pull out', 'damage']);
            $table->date('action_date');
            $table->text('details')->nullable();
            $table->foreign('inventory_item_id')->references('id')->on('inventory_items');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventory_item_history');
    }
}
