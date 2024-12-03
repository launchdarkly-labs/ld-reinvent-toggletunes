//@ts-nocheck
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RED, BLUE, PURPLE, GREEN } from "@/lib/constant";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef(({ className, variant, ...props }, ref) => {
  let backgroundClass = "";
  switch (variant) {
    case BLUE:
      console.log("triggering blue");
      backgroundClass =
        "bg-[url('/images/gifs/blueWinner50mb.gif')] text-white";
      break;
    case RED:
      console.log("triggering red");
      backgroundClass =
        "bg-[url('/images/gifs/redWinner50mb.gif')] text-white";
      break;
    case PURPLE:
      console.log("triggering purple");
      backgroundClass =
        "bg-[url('/images/gifs/purpleWinner50mb.gif')] text-white";
      break;
    case GREEN:
      console.log("triggering green");
      backgroundClass =
        "bg-[url('https://uploadthing.com/f/9ece43b7-0efc-442a-917c-d766ec1b2f8e-wkjqfr.gif')] text-black";
      break;
    case "tie":
      console.log("triggering tie");
      backgroundClass = "bg-ldgray text-white";
      break;
    case "start":
      backgroundClass = "bg-ldgray text-white";
      break;
    default:
      backgroundClass = "bg-transparent text-white";
      break;

  }
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      {variant != "start" ? (
        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            opacity: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
          }}
          transition={{
            duration: 1,
          }}
          ref={ref}
          className={cn(
            "fixed bg-cover z-50 grid w-screen h-screen translate-x-[-50%] translate-y-[-50%] gap-4 bg-slate-700 font-sohne p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            backgroundClass,
            className
          )}
          {...props}
        />
      ) : (
        <AlertDialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-screen h-screen translate-x-[-50%] translate-y-[-50%] gap-4 bg-black text-white font-audimat p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            className
          )}
          {...props}
        ></AlertDialogPrimitive.Content>
      )}
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 items-end",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const stringsArray = ["3", "2", "1", "GO!"];

const AlertDialogTitle = React.forwardRef(
  ({ className, animationStarted, setAnimationStarted, setOpenStartModal, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const lastIndex = stringsArray.length - 1;
    //animation settings

    const onAnimationComplete = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= lastIndex) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
      if (stringsArray[currentIndex] === "GO!") {
        setOpenStartModal(false);
        setAnimationStarted(false);
        document.getElementById("timer-play-button")?.click();
      }
    };

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          setAnimationStarted(true);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      if (animationStarted && currentIndex < stringsArray.length) {
        const timeout = setTimeout(onAnimationComplete, 1500);
        return () => {
          clearTimeout(timeout);
        };
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [animationStarted, currentIndex]);

    return (
      <>
        {animationStarted ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: 1,
              scale: [4, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeIn",
              delay: 0.2,
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={onAnimationComplete}
            ref={ref}
            className={cn(
              "pt-32 flex place-content-center text-white text-center text-9xl font-audimat",
              className,
              {
                hidden: currentIndex >= stringsArray.length,
              }
            )}
            {...props}
          >
            {stringsArray[currentIndex]}
          </motion.div>
        ) : null}
      </>
    );
  }
);
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground items-end", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
