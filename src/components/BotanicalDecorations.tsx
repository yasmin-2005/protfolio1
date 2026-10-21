import React from 'react';

interface BotanicalCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

/**
 * Delicate Botanical Corner Vine
 * Features fine-line curling stems, graceful leaves, and small pastel blossoms (blush pink, lavender, and white).
 */
export const BotanicalCornerVine: React.FC<BotanicalCornerProps> = ({
  position = 'top-left',
  className = '',
  size = 'md',
  animated = true,
}) => {
  // Dimension mapping
  const sizeMap = {
    sm: { w: 120, h: 120 },
    md: { w: 180, h: 180 },
    lg: { w: 240, h: 240 },
  };

  const { w, h } = sizeMap[size];

  // Rotation / flipping transforms
  const transformMap = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  };

  const originMap = {
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right',
  };

  return (
    <div
      className={`pointer-events-none select-none absolute z-0 overflow-hidden ${className}`}
      style={{
        transform: transformMap[position],
        transformOrigin: originMap[position],
      }}
      aria-hidden="true"
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-85"
      >
        <defs>
          <linearGradient id="sageStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E9E8B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#9AB6A5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#BACDC1" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="blushPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#F6EAF0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EAB8CB" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="lavenderPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#EEE9FA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C9BBE8" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D5E5DC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#AFC9B9" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Primary Arching Botanical Stem */}
        <path
          d="M 6,192 C 12,142 28,95 72,54 C 114,15 162,10 196,8"
          stroke="url(#sageStemGrad)"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Delicate Tendril */}
        <path
          d="M 38,102 C 54,82 78,76 102,80 C 122,83 140,74 152,58"
          stroke="#9AB6A5"
          strokeWidth="1.0"
          strokeLinecap="round"
          strokeDasharray="1 0"
          opacity="0.7"
        />

        {/* Curling Whisper Vine */}
        <path
          d="M 102,80 C 118,92 126,112 118,128 C 112,140 98,142 94,134 C 90,126 98,116 108,118"
          stroke="#9AB6A5"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Top Curling Tendril with subtle spiral */}
        <path
          d="M 160,20 C 176,14 192,20 194,30 C 196,38 188,44 180,40 C 174,36 178,28 184,28"
          stroke="#9AB6A5"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Group of Botanical Leaves along the Main Stem */}
        {/* Leaf 1 (Lower stem) */}
        <path
          d="M 14,162 C 2,154 4,136 18,142 C 26,146 22,158 14,162 Z"
          fill="url(#leafGrad)"
          stroke="#7E9E8B"
          strokeWidth="0.8"
        />
        <path d="M 14,162 Q 13,148 18,142" stroke="#6C8C7A" strokeWidth="0.6" opacity="0.8" />

        {/* Leaf 2 (Paired opposite) */}
        <path
          d="M 22,140 C 34,136 42,146 36,156 C 30,162 20,152 22,140 Z"
          fill="url(#leafGrad)"
          stroke="#7E9E8B"
          strokeWidth="0.8"
        />

        {/* Leaf 3 (Mid-arch) */}
        <path
          d="M 54,78 C 44,62 52,48 66,56 C 74,62 68,74 54,78 Z"
          fill="url(#leafGrad)"
          stroke="#7E9E8B"
          strokeWidth="0.8"
        />
        <path d="M 54,78 Q 57,64 66,56" stroke="#6C8C7A" strokeWidth="0.6" opacity="0.8" />

        {/* Leaf 4 (Upper branch) */}
        <path
          d="M 126,32 C 122,18 136,12 144,22 C 148,28 140,36 126,32 Z"
          fill="url(#leafGrad)"
          stroke="#7E9E8B"
          strokeWidth="0.8"
        />

        {/* Leaf 5 (Slender tip) */}
        <path
          d="M 178,10 C 188,2 198,4 196,14 C 190,18 182,14 178,10 Z"
          fill="url(#leafGrad)"
          stroke="#7E9E8B"
          strokeWidth="0.8"
        />

        {/* Small Graceful Leaves on tendrils */}
        <path
          d="M 78,80 C 82,68 94,70 90,82 C 86,88 80,86 78,80 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.75"
        />

        <path
          d="M 140,68 C 152,66 156,76 148,82 C 142,86 138,76 140,68 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.75"
        />

        {/* 1. Feature Blossom: Delicate 5-petal Blush Pink Flower (Mid-Vignette) */}
        <g transform="translate(86, 44)">
          {/* Petals */}
          <path
            d="M 0,0 C -4,-12 4,-12 0,0 Z"
            fill="url(#blushPetalGrad)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C 10,-8 14,0 0,0 Z"
            fill="url(#blushPetalGrad)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C 12,4 6,12 0,0 Z"
            fill="url(#blushPetalGrad)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C -4,12 -12,6 0,0 Z"
            fill="url(#blushPetalGrad)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C -12,0 -10,-8 0,0 Z"
            fill="url(#blushPetalGrad)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          {/* Flower Center Core & Golden Stamen Dots */}
          <circle cx="0" cy="0" r="2.2" fill="#FAF8F3" stroke="#D488A5" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="0.9" fill="#D488A5" />
        </g>

        {/* 2. Secondary Flower: Lavender Mist Blossom (Upper stem) */}
        <g transform="translate(154, 26)">
          <path
            d="M 0,0 C -3,-9 3,-9 0,0 Z"
            fill="url(#lavenderPetalGrad)"
            stroke="#B9A9DC"
            strokeWidth="0.7"
          />
          <path
            d="M 0,0 C 8,-6 10,1 0,0 Z"
            fill="url(#lavenderPetalGrad)"
            stroke="#B9A9DC"
            strokeWidth="0.7"
          />
          <path
            d="M 0,0 C 7,6 2,9 0,0 Z"
            fill="url(#lavenderPetalGrad)"
            stroke="#B9A9DC"
            strokeWidth="0.7"
          />
          <path
            d="M 0,0 C -4,9 -8,4 0,0 Z"
            fill="url(#lavenderPetalGrad)"
            stroke="#B9A9DC"
            strokeWidth="0.7"
          />
          <path
            d="M 0,0 C -9,-2 -7,-7 0,0 Z"
            fill="url(#lavenderPetalGrad)"
            stroke="#B9A9DC"
            strokeWidth="0.7"
          />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" stroke="#A996D1" strokeWidth="0.6" />
        </g>

        {/* 3. Small Tender Blossom Bud (Lower stem) */}
        <g transform="translate(30, 114)">
          <path
            d="M 0,0 C -3,-7 2,-8 0,0 Z"
            fill="#FAF8F3"
            stroke="#DFA4BA"
            strokeWidth="0.65"
          />
          <path
            d="M 0,0 C 3,-7 7,-2 0,0 Z"
            fill="#F6EAF0"
            stroke="#DFA4BA"
            strokeWidth="0.65"
          />
          <circle cx="0" cy="0" r="1.2" fill="#7E9E8B" />
        </g>

        {/* Tiny Botanical Seed Dots / Stippling */}
        <circle cx="96" cy="38" r="0.8" fill="#7E9E8B" opacity="0.6" />
        <circle cx="102" cy="46" r="0.7" fill="#DFA4BA" opacity="0.6" />
        <circle cx="146" cy="40" r="0.8" fill="#A996D1" opacity="0.6" />
        <circle cx="166" cy="16" r="0.7" fill="#7E9E8B" opacity="0.5" />

        {/* Animated gentle floating petal */}
        {animated && (
          <g className="animate-petal-drift">
            <path
              d="M 112,62 C 118,58 122,64 116,68 C 112,70 108,66 112,62 Z"
              fill="url(#blushPetalGrad)"
              stroke="#DFA4BA"
              strokeWidth="0.6"
              opacity="0.8"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Slender Botanical Vine Divider
 * An exquisite horizontal ornamental stem with miniature leaves, central bud, and delicate tendrils.
 */
export const BotanicalDivider: React.FC<{ className?: string; centered?: boolean }> = ({
  className = '',
  centered = true,
}) => {
  return (
    <div
      className={`pointer-events-none select-none flex items-center ${
        centered ? 'justify-center' : 'justify-start'
      } py-2 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="340"
        height="32"
        viewBox="0 0 340 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto opacity-80"
      >
        <defs>
          <linearGradient id="divStemLeft" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8DAA97" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#A8C2B1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C8DAD0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="divStemRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8DAA97" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#A8C2B1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C8DAD0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="centerBlossom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F6EAF0" />
            <stop offset="100%" stopColor="#EAB8CB" />
          </linearGradient>
        </defs>

        {/* Left graceful stem */}
        <path
          d="M 158,16 C 130,14 100,20 68,17 C 42,15 20,16 4,16"
          stroke="url(#divStemLeft)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path
          d="M 124,15 C 120,9 128,7 132,12 C 134,15 128,17 124,15 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.7"
        />
        <path
          d="M 92,18 C 96,24 88,26 84,21 C 82,18 88,16 92,18 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.7"
        />
        <path
          d="M 52,16 C 50,11 58,10 60,14 C 62,17 56,18 52,16 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.65"
        />

        {/* Right graceful stem */}
        <path
          d="M 182,16 C 210,14 240,20 272,17 C 298,15 320,16 336,16"
          stroke="url(#divStemRight)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <path
          d="M 216,15 C 220,9 212,7 208,12 C 206,15 212,17 216,15 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.7"
        />
        <path
          d="M 248,18 C 244,24 252,26 256,21 C 258,18 252,16 248,18 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.7"
        />
        <path
          d="M 288,16 C 290,11 282,10 280,14 C 278,17 284,18 288,16 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.65"
        />

        {/* Central Floral Emblem */}
        <g transform="translate(170, 16)">
          {/* Small 4-petal central bloom */}
          <path
            d="M 0,0 C -2,-7 2,-7 0,0 Z"
            fill="url(#centerBlossom)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C 7,-2 7,2 0,0 Z"
            fill="url(#centerBlossom)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C 2,7 -2,7 0,0 Z"
            fill="url(#centerBlossom)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <path
            d="M 0,0 C -7,2 -7,-2 0,0 Z"
            fill="url(#centerBlossom)"
            stroke="#DFA4BA"
            strokeWidth="0.75"
          />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" stroke="#7E9E8B" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="0.7" fill="#7E9E8B" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Botanical Accent Branch
 * A delicate sprig that can rest beside section badges, headers, or card corners.
 */
export const BotanicalAccentBranch: React.FC<{
  className?: string;
  flipped?: boolean;
}> = ({ className = '', flipped = false }) => {
  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg
        width="68"
        height="28"
        viewBox="0 0 68 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-75"
      >
        <path
          d="M 2,24 C 18,22 36,16 64,6"
          stroke="#8DAA97"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Tender leaf pair 1 */}
        <path
          d="M 20,20 C 18,14 26,12 28,17 C 29,20 24,22 20,20 Z"
          fill="#D5E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.65"
        />
        {/* Tender leaf pair 2 */}
        <path
          d="M 38,15 C 42,9 49,12 46,17 C 44,20 39,18 38,15 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.65"
        />
        {/* Little bud blossom at the tip */}
        <g transform="translate(62, 7)">
          <path
            d="M 0,0 C -2,-5 2,-5 0,0 Z"
            fill="#FAF8F3"
            stroke="#DFA4BA"
            strokeWidth="0.6"
          />
          <path
            d="M 0,0 C 4,-2 3,3 0,0 Z"
            fill="#F6EAF0"
            stroke="#DFA4BA"
            strokeWidth="0.6"
          />
          <circle cx="0" cy="0" r="1.0" fill="#7E9E8B" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Running Outer Edge Botanical Border (Vertical)
 * Light, transparent trailing vine along the outer page margin.
 */
export const BotanicalEdgeVine: React.FC<{
  side?: 'left' | 'right';
  className?: string;
}> = ({ side = 'left', className = '' }) => {
  return (
    <div
      className={`pointer-events-none select-none absolute top-0 bottom-0 z-0 overflow-hidden hidden xl:block w-16 opacity-45 ${
        side === 'left' ? 'left-0' : 'right-0'
      } ${className}`}
      style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg
        width="64"
        height="100%"
        viewBox="0 0 64 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 6,0 C 24,100 0,200 18,300 C 36,400 8,500 20,600"
          stroke="#9AB6A5"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="2 1"
          opacity="0.6"
        />
        {/* Periodic delicate leaves along the margin */}
        <path
          d="M 12,85 C 2,82 6,70 16,74 C 20,78 16,86 12,85 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.6"
        />
        <path
          d="M 18,220 C 28,216 32,226 24,230 C 18,234 14,224 18,220 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.6"
        />
        <path
          d="M 22,380 C 12,374 16,364 26,368 C 30,372 26,382 22,380 Z"
          fill="#D6E5DC"
          stroke="#7E9E8B"
          strokeWidth="0.6"
        />
        <path
          d="M 15,510 C 24,504 28,514 20,520 C 14,524 11,514 15,510 Z"
          fill="#E2EEE6"
          stroke="#7E9E8B"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
};
