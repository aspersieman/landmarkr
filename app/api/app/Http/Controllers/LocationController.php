<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use FoursquareApi;

class LocationController extends Controller
{

	public function index()
	{
		return Location::all();
	}

	public function show($id)
	{
		return Location::find($id);
	}

	public function searchByName($name)
	{
		return Location::where('name', 'like', '%'.$name.'%')->get();
	}

	public function searchByLocation($lat, $lng)
	{
		return Location::where('lat', '=', $lat)
			->where('lng', '=', $lng)->get();
	}

	public function searchBySearchTerm($name)
	{
		return Location::where('search_term', '=', $name)->get();
	}

	public function searchFoursquare($name)
	{
		$locations = Location::where('search_term', '=', $name)->get();
		if ($locations->count() == 0)
		{
			$foursquare = new FoursquareApi($_ENV['FOURSQUARE_CLIENT_ID'], $_ENV['FOURSQUARE_CLIENT_SECRET']);
			// Searching for venues $name
			$endpoint = "venues/search";

			// Prepare parameters
			$params = array("near"=>$name);

			// Perform a request to a public resource
			$response = $foursquare->GetPublic($endpoint,$params);

			// Returns a list of Venues
			$venues = $foursquare->GetPublic($endpoint ,$params, $POST=false);
			$response = json_decode($venues,true);
			if (isset($response['response']['venues'])) {
				foreach ($response['response']['venues'] as $venue) {
					$location = new Location;
					$location->fs_id = $venue['id'];
					$location->name = $venue['name'];
					$location->location = json_encode($venue['location']);
					$location->lat = $venue['location']['lat'];
					$location->lng = $venue['location']['lng'];
					$location->url = isset($venue['url'])?$venue['url']:null;
					$location->search_term = $name;
					$location->save();
				}
			}
			$locations = Location::where('search_term', '=', $name)->get();
		}
		return $locations;
	}

	public function store(Request $request)
	{
		return Location::create($request->all());
	}

	public function update(Request $request, $id)
	{
		$location = Location::findOrFail($id);
		$location->update($request->all());

		return $location;
	}

	public function delete(Request $request, $id)
	{
		$location = Location::findOrFail($id);
		$location->delete();

		return 204;
	}
}
