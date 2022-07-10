import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe

  //recupero lod parametros de la url
  constructor(private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {

    //devuelve un observable
    this.activatedRoute.params
      .pipe( // invoco el servicio
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
      )
      .subscribe(heroe => this.heroe = heroe);

  }

  back() {
    this.router.navigate(['/heroes/list'])
  }

}
