//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTimer } from "@/lib/useTimer";

export function StartModal({
  openStartModal,
  setOpenStartModal,
  animationStarted,
  setAnimationStarted,
}) {
  const onComplete = () => {
    // Play notification sound
    const audio = new Audio("/notification.mp3");
    audio.play();
  };
  const { timeLeft, isActive, startTimer, pauseTimer, resetTimer, duration } = useTimer();

  function handleClick() {
    setOpenStartModal(false);
    document.getElementById("timer-play-button")?.click();
  }

  return (
    <>
      <AlertDialog open={openStartModal}>
        <AlertDialogTrigger asChild onClick={handleClick}>
          <AlertDialogContent variant="start">
            {/* <AlertDialogHeader /> */}
            <div className={`flex flex-col gap-y-0`}>
              <img src="/images/ld-logo.svg" alt="ld-logo" className="h-20 xl:h-20" />
              {animationStarted ? (
                <div className="w-full h-full">
                  <AlertDialogTitle
                    setOpenStartModal={setOpenStartModal}
                    setAnimationStarted={setAnimationStarted}
                    animationStarted={animationStarted}
                  />
                  <p
                    className="flex h-full w-full items-center justify-center text-6xl pb-4"
                    id="starter-dialog"
                  >
                    Get Ready for the Next Round!
                  </p>
                </div>
              ) : (
                <p
                  className="flex h-full w-full items-center justify-center text-6xl pb-4"
                  id="starter-dialog"
                >
                  Get Ready for the Next Round!
                </p>
              )}
            </div>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
