import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  formLocal: FormGroup;
  map: google.maps.Map;
  placesService: google.maps.places.PlacesService;
  mercados: google.maps.Marker[] = [];
  options: google.maps.MapOptions;

  @ViewChild('buscaLocal')
  public buscaLocalRef: ElementRef;

  ngOnInit(): void {
    this.options = {
      center: {lat: -23.551186, lng: -46.635252},
      zoom: 12,
      styles: [{
        featureType: "poi",
        stylers: [{ visibility: "off" }]
      },{
        featureType: "poi.business",
        stylers: [{ visibility: "on" }]
      }]
    };
  }

  setMap({map}) {
    this.map = map;
    this.placesService = new google.maps.places.PlacesService(map);
    // Caixa de Busca de Locais
    let autocomplete = new google.maps.places.Autocomplete(this.buscaLocalRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        var place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) return;

        var request = {
          location: place.geometry.location,
          radius: 1500,
          type: 'supermarket'
        };

        this.placesService.nearbySearch(request, (mercados, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.mercados = [];
            for (var mercado of mercados) {
              this.mercados.push(new google.maps.Marker({
                clickable: false,
                position: mercado.geometry.location,
                map: this.map
              }));
            }
          }
        })

        this.map.panTo(place.geometry.location);
        this.map.setZoom(16);
      });
    })
  }
}
