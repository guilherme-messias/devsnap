import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EpisodeReviewsListResponse } from '../models/episode-reviews-list-response.model';
import { EpisodeReviewDetailResponse } from '../models/episode-review-detail-response.model';
import { EpisodeReview } from '../models/episode-reviews.model';

interface episodeReviewRequest {
  result: string;
  focusSessionId: string;
}

@Injectable({ providedIn: 'root' })
export class EpisodeReviewsApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  getEpisodesReviews(episodeId: string) {
    return this._httpClient.get<EpisodeReviewsListResponse>(
      `${this.apiUrl}/episodes/${episodeId}/reviews`,
    );
  }

  getEpisodeReviewById(episodeId: string, episodeReviewId: string) {
    return this._httpClient.get<EpisodeReviewDetailResponse>(
      `${this.apiUrl}/episodes/${episodeId}/reviews/${episodeReviewId}`,
    );
  }

  createEpisodeReview(episodeId: string, request: episodeReviewRequest) {
    return this._httpClient.post<EpisodeReview>(
      `${this.apiUrl}/episodes/${episodeId}/reviews`,
      request,
    );
  }

  deleteEpisodeReview(episodeId: string) {
    return this._httpClient.delete(`${this.apiUrl}/episodes/${episodeId}/reviews/latest`);
  }
}
