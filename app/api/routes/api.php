<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// CORS
header('Access-Control-Allow-Origin: http://landmarkr.app');
header('Access-Control-Allow-Credentials: true');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('locations', 'LocationController@index');
    Route::get('locations/{location}', 'LocationController@show');
    Route::post('locations', 'LocationController@store');
    Route::put('locations/{location}', 'LocationController@update');
    Route::delete('locations/{location}', 'LocationController@delete');
    Route::get('locations/foursquare/{location}', 'LocationController@searchFoursquare');

    Route::get('images', 'ImageController@index');
    Route::get('images/{image}', 'ImageController@show');
    Route::post('images', 'ImageController@store');
    Route::put('images/{image}', 'ImageController@update');
    Route::delete('images/{image}', 'ImageController@delete');
    Route::get('images/flickr/{image}', 'ImageController@searchFlickr');
});
