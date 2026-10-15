import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserTokenStoreService } from '@app/core/services/user-token-store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly _router = inject(Router)
  private readonly _userTokenStore = inject(UserTokenStoreService)
  
  logout(): void {
    this._userTokenStore.removeToken();
    this._router.navigate(['/login'])
  }
}
