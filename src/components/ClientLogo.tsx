import React from 'react';
import { ExternalLink } from 'lucide-react';

export type ClientId = 'house-of-dorii' | 'lokoboko' | 'stuff-the-food-up' | 'yaki-home-objects';

export interface ClientMeta {
  name: string;
  url: string;
  type: 'website' | 'instagram';
  founder: string;
}

export const CLIENT_DATA: Record<string, ClientMeta> = {
  'house-of-dorii': {
    name: 'House of Dorii',
    url: 'https://houseofdorii.in/',
    type: 'website',
    founder: 'Aakansha Sharma',
  },
  'lokoboko': {
    name: 'LokoBoko Store',
    url: 'https://www.instagram.com/lokoboko.store',
    type: 'instagram',
    founder: 'Nishant Tiwari',
  },
  'stuff-the-food-up': {
    name: 'Stuff the food up',
    url: 'https://www.instagram.com/stuffthefoodup/',
    type: 'instagram',
    founder: 'Surbhi & Jyotika',
  },
  'yaki-home-objects': {
    name: 'Yaki Home',
    url: 'https://www.instagram.com/yaki_hobjects/',
    type: 'instagram',
    founder: 'Reema Sharma',
  },
};

interface ClientLogoProps {
  client: ClientId | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isDark?: boolean;
  showLabels?: boolean;
  asLink?: boolean;
  href?: string;
}

/**
 * Authentic vector logos for ADVYX's clients,
 * carefully recreated from the user's uploaded logo assets:
 * - HOD logo.jpg (House of Dorii) -> https://houseofdorii.in/
 * - LB logo.jpg (LokoBoko Store) -> https://www.instagram.com/lokoboko.store
 * - STFU logo.jpg (Stuff The Food Up) -> https://www.instagram.com/stuffthefoodup/
 * - Yaki logo.jpg (Yaki Home & Objects) -> https://www.instagram.com/yaki_hobjects/
 */
export const ClientLogo: React.FC<ClientLogoProps> = ({
  client,
  size = 'md',
  className = '',
  isDark = false,
  showLabels = true,
  asLink = true,
  href,
}) => {
  const normalized = client.toLowerCase().replace(/[\s&_]+/g, '-');

  const dimensions = {
    sm: { height: 32, icon: 'h-8' },
    md: { height: 44, icon: 'h-11' },
    lg: { height: 56, icon: 'h-14' },
  }[size];

  // Resolve client link and info
  let clientMeta: ClientMeta = {
    name: client,
    url: '#',
    type: 'website',
    founder: '',
  };

  if (normalized.includes('dorii') || normalized.includes('dorri') || normalized.includes('hod')) {
    clientMeta = CLIENT_DATA['house-of-dorii'];
  } else if (normalized.includes('lokoboko') || normalized.includes('lb')) {
    clientMeta = CLIENT_DATA['lokoboko'];
  } else if (normalized.includes('stuff') || normalized.includes('food') || normalized.includes('stfu')) {
    clientMeta = CLIENT_DATA['stuff-the-food-up'];
  } else if (normalized.includes('yaki')) {
    clientMeta = CLIENT_DATA['yaki-home-objects'];
  }

  const finalUrl = href || clientMeta.url;
  const isInteractive = asLink && finalUrl && finalUrl !== '#';

  const CardWrapper = isInteractive ? 'a' : 'div';
  const linkProps = isInteractive
    ? {
        href: finalUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        title: `Visit ${clientMeta.name} (${finalUrl})`,
        'aria-label': `Visit ${clientMeta.name} on ${clientMeta.type === 'website' ? 'official website' : 'Instagram'}`,
      }
    : {
        title: `${clientMeta.name} — Founded by ${clientMeta.founder}`,
      };

  // 1. House of Dorii (HOD)
  if (normalized.includes('dorii') || normalized.includes('dorri') || normalized.includes('hod')) {
    return (
      <CardWrapper
        {...linkProps}
        className={`group inline-flex items-center ${showLabels ? 'gap-3 px-3.5' : 'justify-center px-4'} py-2 rounded-2xl border transition-all ${
          isInteractive ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
        } ${
          isDark
            ? 'bg-[#15121e]/80 border-slate-800 text-white hover:border-[#EA5A35]/50 hover:shadow-lg hover:shadow-[#EA5A35]/10'
            : 'bg-white border-slate-200/90 shadow-sm text-slate-900 hover:border-[#EA5A35]/60 hover:shadow-md'
        } ${className}`}
      >
        <svg
          viewBox="0 0 160 70"
          height={dimensions.height}
          className="w-auto shrink-0 max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bold Coral HOD */}
          <text
            x="4"
            y="36"
            fill="#EA5A35"
            fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="34"
            letterSpacing="2"
          >
            HOD
          </text>
          {/* Cursive "house of dorii" */}
          <text
            x="6"
            y="52"
            fill="#EA5A35"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="12.5"
            letterSpacing="0.5"
          >
            house of dorii
          </text>
          {/* Looping colorful thread */}
          <path
            d="M8 63 C 35 63, 45 56, 65 62 C 85 68, 95 55, 105 60 C 115 65, 120 54, 130 63"
            stroke="#1F7085"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M60 61 C 75 66, 85 55, 95 60"
            stroke="#4EA375"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M95 60 C 105 65, 115 56, 135 63"
            stroke="#EA5A35"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {showLabels && (
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold font-display leading-tight text-[#EA5A35] flex items-center gap-1">
              House of Dorii
              {isInteractive && <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Aakansha Sharma</span>
          </div>
        )}
      </CardWrapper>
    );
  }

  // 2. LokoBoko Store (LB)
  if (normalized.includes('lokoboko') || normalized.includes('lb')) {
    return (
      <CardWrapper
        {...linkProps}
        className={`group inline-flex items-center ${showLabels ? 'gap-3 px-3.5' : 'justify-center px-4'} py-2 rounded-2xl border transition-all ${
          isInteractive ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
        } ${
          isDark
            ? 'bg-[#1a141b]/80 border-slate-800 text-white hover:border-[#C24E82]/50 hover:shadow-lg hover:shadow-[#C24E82]/10'
            : 'bg-[#FAF6F8] border-[#F0DFE8] shadow-sm text-slate-900 hover:border-[#C24E82]/60 hover:shadow-md'
        } ${className}`}
      >
        <svg
          viewBox="0 0 140 70"
          height={dimensions.height}
          className="w-auto shrink-0 max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Serif LB Monogram */}
          <text
            x="14"
            y="42"
            fill={isDark ? '#F5EDF2' : '#111111'}
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="40"
            letterSpacing="1"
          >
            LB
          </text>
          {/* Floral Petal Blooming accent on L */}
          <path
            d="M18 40 C 14 36, 12 32, 17 28 C 22 24, 25 29, 21 34 Z"
            fill="#C24E82"
          />
          <circle cx="18" cy="33" r="2" fill="#E8A2C3" />
          {/* L O K O B O K O . S T O R E */}
          <text
            x="8"
            y="58"
            fill={isDark ? '#C7B9C4' : '#333333'}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="7"
            letterSpacing="2.5"
          >
            LOKOBOKO.STORE
          </text>
        </svg>
        {showLabels && (
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold font-display leading-tight flex items-center gap-1">
              LokoBoko Store
              {isInteractive && <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Nishant Tiwari</span>
          </div>
        )}
      </CardWrapper>
    );
  }

  // 3. Stuff The Food Up (STFU)
  if (normalized.includes('stuff') || normalized.includes('food') || normalized.includes('stfu')) {
    return (
      <CardWrapper
        {...linkProps}
        className={`group inline-flex items-center ${showLabels ? 'gap-3 px-3.5' : 'justify-center px-4'} py-2 rounded-2xl border transition-all ${
          isInteractive ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
        } ${
          isDark
            ? 'bg-[#1d1612]/90 border-slate-800 text-white hover:border-[#B35F36]/50 hover:shadow-lg hover:shadow-[#B35F36]/10'
            : 'bg-[#291F1A] border-[#3D2F28] shadow-sm text-white hover:border-[#B35F36]/70 hover:shadow-md'
        } ${className}`}
      >
        <svg
          viewBox="0 0 150 70"
          height={dimensions.height}
          className="w-auto shrink-0 max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Spoon and Fork crossed in arch */}
          <path
            d="M45 10 C 60 4, 90 4, 105 10"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Dashes */}
          <line x1="42" y1="20" x2="52" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="24" x2="50" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="98" y1="20" x2="108" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="100" y1="24" x2="110" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

          {/* Fork (diagonal) */}
          <line x1="64" y1="12" x2="86" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 10 L 66 14 M 64 8 L 68 12 M 66 7 L 70 11" stroke="white" strokeWidth="1.5" />
          {/* Spoon (diagonal) */}
          <line x1="86" y1="12" x2="64" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="86" cy="11" rx="4" ry="3" fill="white" transform="rotate(-30 86 11)" />

          {/* Terracotta Banner */}
          <rect x="25" y="32" width="100" height="18" rx="4" fill="#B35F36" />
          <text
            x="75"
            y="45"
            fill="white"
            fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="12.5"
            letterSpacing="4"
            textAnchor="middle"
          >
            S T F U
          </text>

          {/* Subtitle */}
          <text
            x="75"
            y="62"
            fill="#EAD5CB"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="7"
            letterSpacing="2.2"
            textAnchor="middle"
          >
            STUFFTHEFOODUP
          </text>
        </svg>
        {showLabels && (
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold font-display leading-tight text-amber-200 flex items-center gap-1">
              Stuff The Food Up
              {isInteractive && <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
            </span>
            <span className="text-[10px] text-amber-100/70 font-medium">Surbhi & Jyotika</span>
          </div>
        )}
      </CardWrapper>
    );
  }

  // 4. Yaki Home & Objects (Yaki)
  return (
    <CardWrapper
      {...linkProps}
      className={`group inline-flex items-center ${showLabels ? 'gap-3 px-3.5' : 'justify-center px-4'} py-2 rounded-2xl border transition-all ${
        isInteractive ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
      } ${
        isDark
          ? 'bg-[#062420]/90 border-slate-800 text-white hover:border-[#0F4A43]/70 hover:shadow-lg hover:shadow-[#0F4A43]/20'
          : 'bg-[#08332E] border-[#0F4A43] shadow-sm text-white hover:border-[#177267] hover:shadow-md'
      } ${className}`}
    >
      <svg
        viewBox="0 0 150 70"
        height={dimensions.height}
        className="w-auto shrink-0 max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Elegant cursive "Yaki" script */}
        <text
          x="15"
          y="42"
          fill="#FAF8F5"
          fontFamily="'Playfair Display', Georgia, cursive, serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="36"
          letterSpacing="1"
        >
          Yaki
        </text>
        {/* Botanical 4-point sparkle dot on the 'i' */}
        <path
          d="M72 16 L74 21 L79 23 L74 25 L72 30 L70 25 L65 23 L70 21 Z"
          fill="#E7DFD5"
        />
        {/* Spaced "HOME" */}
        <text
          x="44"
          y="56"
          fill="#B7C9C5"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="600"
          fontSize="9"
          letterSpacing="4.5"
        >
          H O M E
        </text>
      </svg>
      {showLabels && (
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-extrabold font-display leading-tight text-emerald-100 flex items-center gap-1">
            Yaki Home & Objects
            {isInteractive && <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
          </span>
          <span className="text-[10px] text-emerald-200/70 font-medium">Reema Sharma</span>
        </div>
      )}
    </CardWrapper>
  );
};
