import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ConfettiExplosion, {ConfettiProps} from 'react-confetti-explosion';

const largeProps: ConfettiProps = {
  force: 0.8,
  duration: 4000,
  particleCount: 300,
  width: 1600,
  colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

export function Modal({winnerState, winnerName, setWinnerState, setResetScores, isExploding, setIsExploding}: any) {

  return (
    <>
      <AlertDialog defaultOpen={true}>
        <AlertDialogTrigger asChild={winnerState}>
          {winnerState && (
            <AlertDialogContent className="bg-blue-500">
              {isExploding && <ConfettiExplosion {...largeProps} />}
              <AlertDialogHeader></AlertDialogHeader>
              <AlertDialogDescription className="flex place-content-center text-white text-8xl pb-4 text-center">
                Winner!
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => {
                    setWinnerState(false),
                      setResetScores(true),
                      setIsExploding(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
