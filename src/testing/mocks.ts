import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';

// Stub mínimo de OAuthService para no depender de OAuthModule en los tests
export function createOAuthServiceStub() {
  return {
    configure: vi.fn(),
    setupAutomaticSilentRefresh: vi.fn(),
    hasValidAccessToken: vi.fn().mockReturnValue(false),
    initLoginFlow: vi.fn(),
    logOut: vi.fn(),
    getAccessToken: vi.fn().mockReturnValue('test-token'),
    loadUserProfile: vi.fn().mockResolvedValue({ info: buildLoginInfo() }),
    tryLogin: vi.fn().mockResolvedValue(true),
  };
}

export function buildLoginInfo(overrides: Partial<SpotifyLoginInfo> = {}): SpotifyLoginInfo {
  return {
    display_name: 'Test User',
    external_urls: { spotify: 'https://open.spotify.com/user/test' },
    href: 'https://api.spotify.com/v1/users/test',
    id: 'test',
    images: [{ url: 'https://example.com/avatar.png', height: 64, width: 64 }],
    type: 'user',
    uri: 'spotify:user:test',
    followers: { href: null, total: 0 },
    country: 'CO',
    product: 'premium',
    explicit_content: { filter_enabled: false, filter_locked: false },
    email: 'test@example.com',
    ...overrides,
  };
}
