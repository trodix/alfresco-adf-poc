/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Routes } from '@angular/router';
import { AuthGuardBpm, AuthGuardEcm } from '@alfresco/adf-core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppsComponent } from './pages/apps/apps.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { DocumentlistComponent } from './pages/documentlist/documentlist.component';
import { StartProcessComponent } from './pages/start-process/start-process.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FileViewComponent } from './pages/file-view/file-view.component';
import { BlobViewComponent } from './pages/file-view/blob-view.component';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [AuthGuardEcm], outlet: 'overlay' },
  { path: 'preview/blob', component: BlobViewComponent, outlet: 'overlay', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
              {
                  path: '',
                  component: HomeComponent
              },
              {
                path: 'home',
                component: HomeComponent
            },
              {
                path: 'apps',
                component: AppsComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/tasks',
                component: TasksComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/tasks/:taskId',
                component: TaskDetailsComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/start-process',
                component: StartProcessComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'documentlist',
                component: DocumentlistComponent,
                canActivate: [ AuthGuardEcm ]
              }

          ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
