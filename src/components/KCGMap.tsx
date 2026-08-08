import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Globe,
  Layers,
  Compass
} from 'lucide-react';
import { KCG_IDENTITY } from '../config/kcgIdentity';

export interface KCGMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markerTitle?: string;
  className?: string;
  mapType?: 'standard' | 'hybrid' | 'satellite';
}

export default function KCGMap({
  latitude = KCG_IDENTITY.geolocation.latitude,
  longitude = KCG_IDENTITY.geolocation.longitude,
  zoom = KCG_IDENTITY.geolocation.defaultZoom,
  markerTitle = KCG_IDENTITY.headquarters.name,
  className = "",
  mapType: initialMapType = 'hybrid'
}: KCGMapProps) {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentMapType, setCurrentMapType] = useState<'standard' | 'hybrid' | 'satellite'>(initialMapType);

  const coordsString = `${latitude}, ${longitude}`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordsString);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(KCG_IDENTITY.headquarters.fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // Generate dynamic map embed source based on mapType
  const embedSrc = React.useMemo(() => {
    const baseEmbed = KCG_IDENTITY.geolocation.embedMapUrl;
    if (currentMapType === 'satellite') {
      return `${baseEmbed}&t=k`;
    } else if (currentMapType === 'hybrid') {
      return `${baseEmbed}&t=h`;
    }
    return baseEmbed;
  }, [currentMapType]);

  return (
    <div className={`w-full kcg-glass bg-[#08080c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl relative ${className}`}>
      {/* Top Bar / Header Controls */}
      <div className="p-5 sm:p-6 border-b border-white/10 bg-black/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-kcg-red/15 border border-kcg-red/40 flex items-center justify-center text-kcg-red shrink-0 shadow-lg shadow-kcg-red/10">
            <MapPin className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded bg-kcg-red/20 border border-kcg-red/40 text-kcg-red font-extrabold">
                {markerTitle} — GPS LIVE
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> VERIFIED HQ
              </span>
            </div>
            <h4 className="text-lg font-display font-bold text-white uppercase tracking-tight mt-1">
              {KCG_IDENTITY.headquarters.fullAddress}
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Map Type Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => setCurrentMapType('hybrid')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all cursor-pointer ${
                currentMapType === 'hybrid'
                  ? 'bg-kcg-red text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hybride
            </button>
            <button
              onClick={() => setCurrentMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all cursor-pointer ${
                currentMapType === 'satellite'
                  ? 'bg-kcg-red text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setCurrentMapType('standard')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all cursor-pointer ${
                currentMapType === 'standard'
                  ? 'bg-kcg-red text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Plan
            </button>
          </div>

          <button
            onClick={handleCopyCoords}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            title="Copier les coordonnées GPS"
          >
            {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Compass className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedCoords ? "GPS Copié !" : coordsString}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-black/90 overflow-hidden">
        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#08080c] z-10 space-y-3">
            <div className="w-8 h-8 border-2 border-kcg-red border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Chargement de la Carte Interactive KCG HOUSE (Zoom {zoom})...
            </span>
          </div>
        )}

        {/* Embedded Google Map */}
        <iframe
          title={`Google Map - ${markerTitle}`}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: currentMapType === 'standard' ? "invert(90%) hue-rotate(180deg) contrast(120%) brightness(90%)" : "none",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setMapLoaded(true)}
          className="w-full h-full relative z-0"
        />

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md p-5 rounded-2xl bg-[#08080c]/90 border border-white/20 backdrop-blur-2xl z-20 shadow-2xl space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono text-kcg-red uppercase tracking-widest font-extrabold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {markerTitle}
              </p>
              <p className="text-sm font-display font-bold text-white mt-0.5">
                {KCG_IDENTITY.headquarters.street}, {KCG_IDENTITY.headquarters.district}
              </p>
              <p className="text-xs text-neutral-300">
                {KCG_IDENTITY.headquarters.city}, {KCG_IDENTITY.headquarters.country}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 block">
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </span>
            </div>
          </div>

          {/* Quick Navigation Launchers */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
              Ouvrir dans votre application de Navigation :
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={KCG_IDENTITY.geolocation.directionsUrls.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Navigation className="w-3 h-3 text-blue-400" />
                <span>Google</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              <a
                href={KCG_IDENTITY.geolocation.directionsUrls.appleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>Apple</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              <a
                href={KCG_IDENTITY.geolocation.directionsUrls.waze}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>Waze</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export as KcgHouseMap for backwards compatibility
export { KCGMap as KcgHouseMap };
