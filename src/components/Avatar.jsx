import { getInitials } from '../utils/formatters';

function Avatar({ src, name, size = 40 }) {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
  };

  if (src) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src={src}
        alt={name}
        style={style}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b82f6',
        color: '#fff',
        fontWeight: 600,
        fontSize: size / 2.5,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;
