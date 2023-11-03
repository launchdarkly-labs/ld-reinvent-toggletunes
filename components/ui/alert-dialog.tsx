//@ts-nocheck
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {motion} from 'framer-motion'
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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

const AlertDialogContent = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    let backgroundClass = "";
    switch(variant) {
          case "blue":
        backgroundClass = "bg-[url('/images/blue-winner.png')] text-white";
        break;
      case "purple":
        backgroundClass = "bg-[url('/images/purple-winner.png')] text-white";
        break;
      case "red":
        backgroundClass = "bg-[url('/images/red-winner.png')] text-white";
        break;
      case "green":
        backgroundClass = "bg-[url('/images/yellow-winner.png')] text-black";
        break;
      case "start":
        backgroundClass = "bg-ldgray text-white";
        break;
      default:
        backgroundClass = "bg-[url('/images/blue-winner.png')] text-white";
        break;
    }
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      {variant != "start" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: [0, 0.5, 1],
          }}
          transition={{
            duration: 1,
            ease: "circIn",
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
            "fixed left-[50%] top-[50%] z-50 grid w-screen h-screen translate-x-[-50%] translate-y-[-50%] gap-4 bg-slate-700 font-sohne p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            className
          )}
          {...props}
          >
        </AlertDialogPrimitive.Content>
      )}
    </AlertDialogPortal>
  );
}
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
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

const AlertDialogTitle = React.forwardRef(({ className, setOpenStartModal, setIsTimerRunning, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animationStarted, setAnimationStarted] = React.useState(false);
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
     setIsTimerRunning(true);
   }
 };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setAnimationStarted(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)

    if (animationStarted && currentIndex < stringsArray.length) {
      const timeout = setTimeout(onAnimationComplete, 1000)
      return () => {
      clearTimeout(timeout);
      }
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[animationStarted, currentIndex])

  return (
    <>
    {animationStarted ? (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, scale: 5 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 2,
        ease: 'easeIn'
      }}
      exit={{opacity: 0}}
      onAnimationComplete={onAnimationComplete}
      ref={ref}
      className={cn(
        "pt-32 flex place-content-center text-amber-500 text-center text-9xl font-audimat",
        className,
        {
          hidden: currentIndex >= stringsArray.length,
        }
      )}
      {...props}
    > 
      {stringsArray[currentIndex]}
    </motion.div>
    ): null} 
    </>
  );
});
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
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
    data-disabled
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
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
