import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
  }
  `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    },
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // sólo hacemos la consulta para editar
    if (this.router.url.includes('add')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
      )
      .subscribe(heroe => this.heroe = heroe)
  }

  save() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      //actualizar
      this.heroesService.putHeroe(this.heroe)
        .subscribe(resp => this.openSnackBar('Updated!'))
    } else {
      //crear
      this.heroesService.postNewHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/edit', heroe.id]);
          this.openSnackBar('Created!');
        })

    }

  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.delteHeroe(this.heroe.id!)
          .subscribe(resp => this.router.navigate(['/heroes']))
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok!', {
      duration: 1000
    });
  }


}
