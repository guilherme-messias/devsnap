import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AnnotationListResponse } from '../models/annotation-list-response.model';
import { Annotation } from '../models/annotation.model';
import { AnnotationDetailResponse } from '../models/annotation-detail-response.model';

interface annotationRequest {
  text: string;
}

@Injectable({ providedIn: 'root' })
export class AnnotationsApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  getAnnotations(episodeId: string) {
    return this._httpClient.get<AnnotationListResponse>(
      `${this.apiUrl}/episodes/${episodeId}/annotations`,
    );
  }

  getAnnotationById(episodeId: string, annotationId: string) {
    return this._httpClient.get<AnnotationDetailResponse>(
      `${this.apiUrl}/episodes/${episodeId}/annotations/${annotationId}`,
    );
  }

  createAnnotation(episodeId: string, request: annotationRequest) {
    return this._httpClient.post<Annotation>(
      `${this.apiUrl}/episodes/${episodeId}/annotations`,
      request,
    );
  }

  updateAnnotation(episodeId: string, request: annotationRequest, annotationId: string) {
    return this._httpClient.patch<Annotation>(
      `${this.apiUrl}/episodes/${episodeId}/annotations/${annotationId}`,
      request,
    );
  }

  deleteAnnotation(episodeId: string, annotationId: string) {
    return this._httpClient.delete(
      `${this.apiUrl}/episodes/${episodeId}/annotations/${annotationId}`,
    );
  }
}
