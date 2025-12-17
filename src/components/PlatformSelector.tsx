import { Platform } from '@/types/post';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformSelectorProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: 'twitter', label: 'Twitter/X', icon: <Twitter className="w-4 h-4" /> },
  { id: 'facebook', label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
  { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
];

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter(p => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary">Platforms</label>
      <div className="flex flex-wrap gap-2">
        {platforms.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => togglePlatform(id)}
            className={cn(
              'platform-btn',
              selected.includes(id) 
                ? 'platform-btn-selected bg-foreground text-background' 
                : 'bg-foreground text-background opacity-60 hover:opacity-80'
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
