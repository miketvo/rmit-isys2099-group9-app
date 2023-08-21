import { IconContext } from 'react-icons/lib';

export function IconSetting(icon, color, size, className) {
    return (
      <IconContext.Provider
        value={{ color: color, size: size , className: className}}
      >
        {icon}
      </IconContext.Provider>
    );
}