import { cn } from "../util/cn.ts";

let Avatar = ({ url, name, className, ...props }) => {
  return (
    <img
      className={cn(["size-12 rounded-full", className])}
      {...props}
      src={url}
      alt={name}
    />
  );
};

export default Avatar;
