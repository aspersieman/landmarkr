import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ImageService } from '../dashboard/services/image.service';

@Component({
	selector: 'app-image-list',
	templateUrl: './image-list.component.html',
	styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
	images: any[];
	imagesCount: any;
	imagesFound: boolean = false;
	searching: boolean = false;

	handleSuccess(data){
		this.imagesFound = true;
		this.images = data;
		this.imagesCount = Object.keys(data).length;
		console.log(data);
	}

	handleError(error){
		console.log(error);
	}

	constructor(private _imageService : ImageService, private route: ActivatedRoute) {
		this.route.params.subscribe( params => this.searchImages(params['name']));
	}

	searchImages(query: string){
		this.searching = true;
		return this._imageService.getImage(query).subscribe(
			data => this.handleSuccess(data),
			error => this.handleError(error),
			() => this.searching = false
		)
	}

	getTags(tags: string) {
		return tags.split(" ").slice(0, 4);
	}

	ngOnInit() {
	}

}
