import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import {
  uploadProgress,
  filterResponse
} from 'src/app/shared/operators/rxjs-operators';
import { FileService } from '../file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  sub$: Subscription;
  progress = 0;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    const elLabel = document.getElementById('customFileLabel');
    //elLabel.innerHTML = selectedFiles[0].name;

    // multiplos arquivos
    const fileNames = [];
    this.files = new Set();

    Array.from(selectedFiles).forEach(f => {
      fileNames.push(f.name);
      this.files.add(f);
    });

    elLabel.innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.sub$ = this.fileService
        .upload(this.files)
        .pipe(
          uploadProgress(progress => (this.progress = progress)),
          filterResponse()
        )
        .subscribe(response => console.log('upload concluído'));
      // .subscribe((event: HttpEvent<Object>) => {
      //   console.log(event);
      //   if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / event.total);
      //     this.progress = percentDone;
      //   } else if (event.type === HttpEventType.Response) {
      //     console.log('upload concluído');
      //   }
      // });
    }
  }

  onDownload(arquivo: string) {
    this.fileService
      .download(`${environment.fileUrlBase}/download/${arquivo}`)
      .subscribe((res: any) => {
        console.log(res);

        this.fileService.handleFile(res, null);
      });
  }
}
