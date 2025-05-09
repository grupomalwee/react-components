import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "@lib";

export const AlertDialogPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="flex justify-center">
          <AlertDialogBase>
            <AlertDialogTriggerBase>Open</AlertDialogTriggerBase>
            <AlertDialogContentBase>
              <AlertDialogHeaderBase>
                <AlertDialogTitleBase>
                  Are you absolutely sure?
                </AlertDialogTitleBase>
                <AlertDialogDescriptionBase>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescriptionBase>
              </AlertDialogHeaderBase>
              <AlertDialogFooterBase>
                <AlertDialogCancelBase>Cancel</AlertDialogCancelBase>
                <AlertDialogActionBase>Continue</AlertDialogActionBase>
              </AlertDialogFooterBase>
            </AlertDialogContentBase>
          </AlertDialogBase>
        </div>

       
       
      </div>
    </>
  );
};
