import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'members',
                loadComponent: () => import('./members/members-list/members-list.component').then(m => m.MembersListComponent)
            },
            {
                path: 'members/:username',
                loadComponent: () => import('./members/member-detail/member-detail.component').then(m => m.MemberDetailComponent),
            },
            {
                path: 'member/edit',
                loadComponent: () => import('./members/member-edit/member-edit.component').then(m => m.MemberEditComponent),
                canDeactivate: [preventUnsavedChangesGuard]
            },
            {
                path: 'lists',
                loadComponent: () => import('./lists/lists.component').then(m => m.ListsComponent),
            },
            {
                path: 'messages',
                loadComponent: () => import('./messages/messages.component').then(m => m.MessagesComponent),
            },
        ]
    },
    {
        path: 'not-found',
        loadComponent: () => import('./errors/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: 'server-error',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    }
];
