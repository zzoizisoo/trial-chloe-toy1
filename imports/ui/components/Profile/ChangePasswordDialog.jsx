import { Accounts } from "meteor/accounts-base";
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

export default function ChangePasswordDialog() {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { currentPassword, newPassword, newPasswordConfirm } = formJson;

    console.log(currentPassword, "->", newPassword, newPasswordConfirm);
    
    if(currentPassword === newPassword){ 
      console.error("passwords are same")
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      console.error("passwords are not matching");
      return;
    }
    Accounts.changePassword(currentPassword, newPassword, (err) => {
      if (err) console.error(err);
      setOpen(false);
    });
  };

  return (
    <React.Fragment>
      <Button
        sx={{ mt: 1 }}
        variant="plain"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Change password
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Change password</DialogTitle>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <Input
                  name="currentPassword"
                  type="password"
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input name="newPassword" type="password" required />
              </FormControl>
              <FormControl>
                <FormLabel>New Password Confirm</FormLabel>
                <Input name="newPasswordConfirm" type="password" required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
