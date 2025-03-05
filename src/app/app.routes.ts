import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MemoramaComponent } from './memorama/memorama.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { IndexComponent } from './index/index.component';
import { FaqComponent } from './faq/faq.component';
import { ComoAyudarComponent } from './como-ayudar/como-ayudar.component';
import { EcosistemasComponent } from './ecosistemas/ecosistemas.component';
import { CuerposDeAguaComponent } from './cuerpos-de-agua/cuerpos-de-agua.component';
import { EspeciesNativasComponent } from './especies-nativas/especies-nativas.component';
import { QuizHomeComponent } from './quiz-home/quiz-home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { ColorearComponent } from './colorear/colorear.component';

// Exportar las rutas de la aplicación
export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'quiz', component: QuizHomeComponent },
    { path: 'memorama', component: MemoramaComponent },
    { path: 'about', component: AboutComponent, data: { animation: 'AboutPage' } },
    { path: 'index', component: IndexComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'como-ayudar', component: ComoAyudarComponent },
    { path: 'ecosistemas', component: EcosistemasComponent},
    { path: 'cuerpos-de-agua', component: CuerposDeAguaComponent},
    { path: 'especies-nativas', component: EspeciesNativasComponent},
    { path: 'ahorcado', component: AhorcadoComponent},
    { path: 'colorear', component: ColorearComponent},
    { path: '', redirectTo: 'index', pathMatch: 'full', data: { animation: 'HomePage' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }