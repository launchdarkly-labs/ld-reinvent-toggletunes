//@ts-nocheck
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
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useLDClient } from "launchdarkly-react-client-sdk";

export function TeamModal({teamName, setTeamName,openTeamModal, setOpenTeamModal, teamSlot, setTeamSlot}: any) {
  const input = useRef();
  const client = useLDClient()
  

  function HandleLogin(e: event) {
    e.preventDefault() 
    const context: any = client?.getContext()
    let name = input.current.value
    context.team.teamSlot = teamSlot
    setTeamName((teamName) => [...teamName, name])
    client?.identify(context);
    setTeamSlot(teamSlot + 1)
  }

  return (
    <>
        <AlertDialog defaultOpen={true}>
          <AlertDialogTrigger asChild>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-amber-500 text-3xl pb-4">
                  Please Enter Your Team Name
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xl">
                  <Input
                    id="name"
                    placeholder="please enter a name"
                    required
                    ref={input}
                    onClick={(e) => e.stopPropagation()}
                  ></Input>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <button
                  onClick={(e) => {
                    HandleLogin(e);
                    setOpenTeamModal(false);
                  }}
                >
                  Continue
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogTrigger>
        </AlertDialog>
    </>
  );
}
