import { GetNotifi } from "../../context/NotifiContext";
import { cn } from "../../util/cn.ts";
import Button from "../ui/Button.tsx";
import { Close } from "../ui/Icons";

let NotifiItem = ({ notif, className }) => {
  let { removeNotif } = GetNotifi();

  let varients = {
    normal: "bg-surface/80",
    warning: "bg-warning/80 text-on-surface fill-on-surface",
    danger: "bg-danger/80",
    success: "bg-success/80",
  };

  let classes = cn(
    "notif-item transition-opacity overflow-hidden duration-300 px-3 py-2 pb-3 relative fill-text text-text rounded-md w-full backdrop-blur-xl shadow-lg",
    varients[notif?.type],
    className,
  );

  return (
    <div className={classes}>
      <Button
        varient="outlined"
        onClick={() => removeNotif(notif.id)}
        className="absolute right-2 top-2 h-fit cursor-pointer border-none fill-inherit p-1 opacity-80"
      >
        <Close inher size={14} onClick />
      </Button>
      <h3 className="font-serif text-lg">{notif?.title}</h3>
      <p className="opacity-70">{notif?.desc}</p>
    </div>
  );
};

export default NotifiItem;
