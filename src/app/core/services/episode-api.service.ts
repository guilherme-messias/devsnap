import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EpisodeListResponse } from '../models/episode-list-response.model';
import { EpisodeDetailResponse } from '../models/episode-detail-response.model';
import { Episode } from '../models/episode.model';
import { episodeRequest } from '../models/episode-request';

@Injectable({ providedIn: 'root' })
export class EpisodeApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  getEpisodes() {
    return this._httpClient.get<EpisodeListResponse>(`${this.apiUrl}/episodes`);
  }

  getEpisodeById(episodeId: string) {
    return this._httpClient.get<EpisodeDetailResponse>(`${this.apiUrl}/episodes/${episodeId}`);
  }

  createEpisode(request: episodeRequest) {
    return this._httpClient.post<Episode>(`${this.apiUrl}/episodes`, request);
  }

  updateEpisode(request: episodeRequest, episodeId: string) {
    return this._httpClient.put<Episode>(`${this.apiUrl}/episodes/${episodeId}`, request);
  }

  deleteEpisode(episodeId: string) {
    return this._httpClient.delete(`${this.apiUrl}/episodes/${episodeId}`);
  }
}
