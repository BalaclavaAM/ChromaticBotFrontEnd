import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.spotify.com/',
    redirectUri: window.location.origin + '/callback',
    responseType: 'code',
    clientId: 'c6ecec0622d44e6c8788ed8e3dca1ad2',
    scope: 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position',
    showDebugInformation: !environment.production,
    oidc: false,
    loginUrl: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    userinfoEndpoint: 'https://api.spotify.com/v1/me',
    revocationEndpoint: 'https://accounts.spotify.com/api/token/revoke',
    // Spotify no implementa OIDC Session Management: los session checks
    // solo generan errores de iframe y logouts espurios.
    sessionChecksEnabled: false,
    requestAccessToken: true,
}
