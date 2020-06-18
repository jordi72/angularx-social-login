import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/social-user';

export interface SocialAuthServiceConfig {
  autoLogin?: boolean;
  providers: { id: string; provider: LoginProvider }[];
}

/** @dynamic */
@Injectable()
export class SocialAuthService {
  private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND =
    'Login provider not found';
  private static readonly ERR_NOT_LOGGED_IN = 'Not logged in';
  private static readonly ERR_NOT_INITIALIZED = 'Login providers not ready yet';

  private providers: Map<string, LoginProvider> = new Map();
  private autoLogin = false;

  private _user: SocialUser = null;
  public authState: ReplaySubject<SocialUser> = new ReplaySubject(1);

  private initialized = false;

  constructor(@Inject('SocialAuthServiceConfig') config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>) {
    if (config instanceof Promise) {
      config.then((config) => {
        this.initialize(config);
      });
    } else {
      this.initialize(config);
    }
  }

  private initialize(config: SocialAuthServiceConfig) {
    this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;

    config.providers.forEach((item) => {
      this.providers.set(item.id, item.provider);
    });

    Promise.all(
      Array.from(this.providers.values()).map((provider) =>
        provider.initialize()
      )
    ).then(() => {
      this.initialized = true;

      this.providers.forEach((provider: LoginProvider, key: string) => {
        if (this.autoLogin) {
          provider
            .getLoginStatus()
            .then((user: SocialUser) => {
              user.provider = key;

              this._user = user;
              this.authState.next(user);
            })
            .catch(console.debug);
        }
      });
    });
  }

  signIn(providerId: string, signInOptions?: any): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) {
        reject(SocialAuthService.ERR_NOT_INITIALIZED);
      } else {
        let providerObject = this.providers.get(providerId);
        if (providerObject) {
          providerObject
            .signIn(signInOptions)
            .then((user: SocialUser) => {
              user.provider = providerId;
              resolve(user);

              this._user = user;
              this.authState.next(user);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
        }
      }
    });
  }

  signOut(revoke: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) {
        reject(SocialAuthService.ERR_NOT_INITIALIZED);
      } else if (!this._user) {
        reject(SocialAuthService.ERR_NOT_LOGGED_IN);
      } else {
        let providerId = this._user.provider;
        let providerObject = this.providers.get(providerId);
        if (providerObject) {
          providerObject
            .signOut(revoke)
            .then(() => {
              resolve();

              this._user = null;
              this.authState.next(null);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
        }
      }
    });
  }
}
