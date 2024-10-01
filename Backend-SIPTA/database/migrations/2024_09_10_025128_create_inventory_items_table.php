<?php

// database/migrations/xxxx_xx_xx_create_inventory_items_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryItemsTable extends Migration
{
    public function up()
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sub_category_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('procurement_id');
            $table->string('item_name');
            $table->string('quality');
            $table->integer('quantity');
            $table->enum('status', ['available', 'loan', 'taken out', 'damage'])->default('available');
            $table->string('serial_number');
            $table->string('item_image')->nullable();
            $table->string('unit');
            $table->string('work_unit');
            $table->string('location');
            $table->unsignedBigInteger('created_by_user_id');
            $table->foreign('sub_category_id')->references('id')->on('sub_categories');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('procurement_id')->references('id')->on('procurements')->onDelete('cascade');
            $table->foreign('created_by_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventory_items');
    }
}
