/**
 * Branding and dynamic asset resolver for TalentRise Training and Placements
 */

// Graceful dynamic image asset loader
const localImages = typeof (import.meta as any).glob === 'function' 
  ? (import.meta as any).glob('../assets/images/*.{jpg,jpeg,png,webp,svg}', { eager: true }) 
  : {};

export function getImageAsset(name: string, fallbackUrl: string): string {
  const match = Object.entries(localImages).find(([path]) => path.includes(name));
  if (match && match[1]) {
    const mod = match[1] as { default?: string };
    return mod.default || fallbackUrl;
  }
  return fallbackUrl;
}

export const BRAND_COLORS = {
  darkNavy: '#0B132B',
  deepSlate: '#0F172A',
  cardBg: '#1C2541',
  warmGold: '#EAB308',
  cobaltBlue: '#2563EB',
  emeraldGreen: '#25D366',
  cyanGlow: '#38BDF8',
};

export const BRAND_INFO = {
  companyName: 'TalentRise',
  subtitle: 'Training and Placements',
  fullName: 'TalentRise Training and Placements',
  founder: 'Sandru Anudeep',
  founderTitle: 'Founder & CEO',
  location: 'Hyderabad, Telangana, India',
  whatsapp: '+91 8328246487',
  whatsappRaw: '8328246487',
  foundedYear: '2024',
  closuresCount: '300+',
  partnerCount: '15+',
  supportHours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
};
