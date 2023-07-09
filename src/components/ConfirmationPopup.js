import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function ConfirmationPopup({ setShow, setEnableDeleteItem }) {
  const [open, setOpen] = React.useState(true);

  const onClickYesHandler = () => {
    setOpen(false);
    setShow(false);
    setEnableDeleteItem(true);
  };

  const onClickNoHandler = () => {
    setOpen(false);
    setShow(false);
  };
  return (
    <Modal
      closeIcon
      open={open}
      //   trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Delete Contact Alert!!!" />
      <Modal.Content>
        <p>Do you want to delete this contact?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClickNoHandler}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={onClickYesHandler}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmationPopup;
