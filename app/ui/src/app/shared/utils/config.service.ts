import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI : string;

    constructor() {
        this._apiURI = 'http://api.landmarkr.app/api';
     }

     getApiURI() {
         return this._apiURI;
     }
}
