interface CardProps {
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green';
}

const colorMap = {
  blue: '#3b82f6',
  purple: '#a855f7',
  green: '#10b981',
};

export function Card({ title, description, color }: CardProps) {
  return (
    <div
      className="card"
      style={{
        borderLeftColor: colorMap[color],
        backgroundColor: `${colorMap[color]}10`,
      }}
    >
      <h3 style={{ color: colorMap[color] }}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
