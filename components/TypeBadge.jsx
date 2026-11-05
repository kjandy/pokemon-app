import { Badge } from '@/components/ui/badge';
import { TYPE_LABELS } from '@/lib/pokemon-labels';

// タイプを色付きのバッジで表示する
export default function TypeBadge({ type }) {
  const info = TYPE_LABELS[type] ?? { label: type, color: '#888888' };

  return (
    <Badge className="text-white" style={{ backgroundColor: info.color }}>
      {info.label}
    </Badge>
  );
}
