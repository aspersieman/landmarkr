<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Image;

class ImageController extends Controller
{
	public function index()
	{
		return Image::all();
	}

	public function show(Image $image)
	{
		return $image;
	}

	public function searchBySearchTerm($location)
	{
		$images = Image::where('search_term', '=', $location)->get();
	}

	public function searchFlickr($location)
	{
		$images = Image::where('search_term', '=', $location)->get();
		if ($images->count() == 0)
		{
			$response = $this->flickerApi(
				array('text' => urlencode($location),
				'media' => 'photos',
				'content_type' => 1,
				'safe_search' => 1,
				'extras' => 'date_upload, date_taken, owner_name, last_update, geo, tags, media, url_l'),
				'flickr.photos.search');
			$response = json_decode($response,true);
			if (isset($response['photos']['photo'])) {
				foreach ($response['photos']['photo'] as $photo) {
					if (isset($photo['url_l'])) {
						$image = new Image;
						$image->fl_id = $photo['id'];
						$image->owner = $photo['owner'];
						$image->ownername = $photo['ownername'];
						$image->title = $photo['title'];
						$image->dateupload = date("Y-m-d", $photo['dateupload']);
						$image->datetaken = $photo['datetaken'];
						$image->url = $photo['url_l'];
						$image->tags = $photo['tags'];
						$image->search_term = $location;
						$image->save();
					}
				}
			}
			$images = Image::where('search_term', '=', $location)->get();
		}
		return $images;
	}

	public function store(Request $request)
	{
		$image = Image::create($request->all());

		return response()->json($image, 201);
	}

	public function update(Request $request, Image $image)
	{
		$image->update($request->all());

		return response()->json($image, 200);
	}

	public function delete(Image $image)
	{
		$image->delete();

		return response()->json(null, 204);
	}

	public function flickerApi(array $args, $method, $per_page = 20)
	{
		$args = array_merge($args, array(
			'api_key' => $_ENV['FLICKR_CLIENT_ID'],
			'method' => $method,
			'user_id' => null,
			'format' => 'json',
			'nojsoncallback' => '1',
			'per_page' => $per_page
		));
		$url = 'http://flickr.com/services/rest/?';
		$search = $url.http_build_query($args);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
		curl_setopt($ch, CURLOPT_URL, $search);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$data = curl_exec($ch);
		$retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		$response = null;
		if ($retcode == 200) {
			$response = $data;
		}
		return $response;
	}
}
