import { icons } from "./registry";

export default function Icon({ name, ...props }) {
  const Component = icons[name];

  if (!Component) return null;

  return <Component {...props} />;
}