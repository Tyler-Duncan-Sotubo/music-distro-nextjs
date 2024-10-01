// Track interface to represent individual tracks in the audio release
interface Track {
  id: string;
  audioId: string;
  title: string;
  lyrics: string | null;
  productionCredit: string;
  ISRC: string;
  trackNumber: number;
  audioLink: string;
}

export type AudioRelease = {
  id: string;
  userId: string;
  title: string;
  artist: string;
  releaseDate: string;
  primaryGenre: string;
  secondaryGenre: string;
  language: string;
  label: string;
  copyrightHolder: string;
  copyrightYear: string;
  productionHolder: string;
  productionYear: string;
  releaseCover: string;
  releaseAudio: string;
  releaseAudioLink: string;
  lyrics: string;
  releaseType: string;
  status: string;
  UPC: string;
  ISRC: string;
  createdAt: string;
  updatedAt: string;
  smartLink: string;
  Track: Track[];
};
