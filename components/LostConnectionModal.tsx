//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export function LostConnectionModal({
  showLostConnectionModal
}) {
 
  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogTrigger >
          <AlertDialogContent variant="start">
            {/* <AlertDialogHeader /> */}
            <div className={`flex flex-col gap-y-0`}>
              <img src="/images/ld-logo.svg" alt="ld-logo" className="h-20 xl:h-20" />
              <p
                  className="flex h-full w-full items-center justify-center text-6xl pb-4"
                  id="starter-dialog"
                >
                  Still trying to reconnect back to game...
                </p>
            </div>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
