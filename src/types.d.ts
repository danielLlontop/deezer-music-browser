import React from "react";

export interface IDeezerTracks {
        data:  Data[];
        total: number;
        next?:  string;
    }
    
    export interface Data {
        id:                      number;
        readable:                boolean;
        title:                   string;
        title_short:             string;
        title_version:           TitleVersion;
        link:                    string;
        duration:                number;
        rank:                    number;
        explicit_lyrics:         boolean;
        explicit_content_lyrics: number;
        explicit_content_cover:  number;
        preview:                 string;
        md5_image:               string;
        artist:                  Artist;
        album:                   Album;
        type:                    DatumType;
    }
    
    export interface Album {
        id:           number;
        title:        string;
        cover:        string;
        cover_small:  string;
        cover_medium: string;
        cover_big:    string;
        cover_xl:     string;
        md5_image:    string;
        tracklist:    string;
        type:         string;
    }
    
    
    export interface Artist {
        id:             number;
        name:           string;
        link:           string;
        picture:        string;
        picture_small:  string;
        picture_medium: string;
        picture_big:    string;
        picture_xl:     string;
        tracklist:      string;
        type:           string;
    }
    
  
    export interface ContextProps {
        data: IDeezerTracks;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleTrackData: (trackData: Data) => void;
        isPlaying: boolean;
        setIsPlaying: (isPlaying: React.SetStateAction<boolean>) => void;
        audioRef: React.RefObject<HTMLAudioElement> | null;
        handlePlayPause: () => void;
        top100Tracks: IDeezerTracks;
        search: string;
        resetData: () => void;
        fetchNextPage: (nextPage?: string) => Promise<void>;
        hasNextPage: boolean;
        isLoading: boolean;
        isLoadingTopTracks: boolean,
        buttonLoading: boolean

    }
    export interface IFavoritesStore {
        favorites: Data[]
        addFavorite: (track: Data) => void
        removeFavorite: (id: number) => void
        clearFavorites: () => void
        isOnFavorites: (id: number) => boolean
        trackData: Data | undefined
        setTrackData: (trackData: Data) => void
    }
