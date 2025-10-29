// Ponto central para integrar YouTube e Spotify futuramente.
// A ideia: normalizar os dados -> { id, title, thumb, youtubeUrl, spotifyUrl, publishedAt }

export async function fetchEpisodesFromJSON(){
  const res = await fetch('./data/episodes.json');
  if(!res.ok) throw new Error('Falha ao carregar episodes.json');
  return res.json();
}

// Exemplos de stubs:
export async function fetchYouTubeLatest(){ /* TODO: chamar API v3 */ return []; }
export async function fetchSpotifyLatest(){ /* TODO: chamar Web API */ return []; }
