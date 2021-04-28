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

import { AlfrescoApiService, NotificationService } from '@alfresco/adf-core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-view',
  templateUrl: 'file-view.component.html',
  styleUrls: ['file-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileViewComponent implements OnInit {
  nodeId: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: AlfrescoApiService,
    private notificationService: NotificationService,

  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.nodeId;
      if (id) {
        this.apiService
          .nodesApi.getNodeInfo(id)
          .then(
            (node) => {
              if (node) {
                this.nodeId = id;
                return;
              }
              this.router.navigate(['/files', id]);
            },
            async () => this.router.navigate(['/files', id])
          );
      }
    });
  }

  onUploadError(errorMessage: string) {
    this.snackBar.open(errorMessage, '', { duration: 4000 });
  }

  /**
   * Fixes https://github.com/Alfresco/generator-alfresco-adf-app/issues/254
   */
  onViewerGoBack() {
    const cleanUrl = this.router.url.split(new RegExp(/\(overlay:[\S]+\)/, 'i'))[0];
    this.router.navigateByUrl(cleanUrl, { replaceUrl: true });
  }

  removeNode() {
    this.apiService.nodesApi.deleteNode(this.nodeId)
      .then(() => {
        this.notificationService.showInfo('Fichier supprimé avec succès');
        this.router.navigate([this.route.parent.url]);
      })
      .catch((err: Error) => {
        this.notificationService.showError(err.message);
      });
  }
}
