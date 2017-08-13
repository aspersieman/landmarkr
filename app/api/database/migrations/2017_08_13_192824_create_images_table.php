<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('images', function (Blueprint $table) {
			$table->increments('id');
			$table->string('fl_id')->unique();
			$table->string('owner');
			$table->string('ownername');
			$table->text('title');
			$table->dateTime('dateupload');
			$table->dateTime('datetaken');
			$table->text('url');
			$table->text('tags');
			$table->text('search_term');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('images');
	}
}
