import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.spotify.com/authorize',
    redirectUri: window.location.origin + '/index.html',
    responseType: 'code',
    scope: 'user-read-private user-read-email',
    showDebugInformation: true,
}