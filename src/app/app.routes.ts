import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'library',
        loadComponent: () =>import ('./pages/library/library').then(m =>m.Library)
    }
    ,
    {
        path:'track-detail',
        loadComponent:()=> import ('./pages/track-detail/track-detail').then(m =>m.TrackDetail)
    }
];
