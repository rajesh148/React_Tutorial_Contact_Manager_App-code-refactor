import React from "react";
import { Button, Modal } from "semantic-ui-react";

function Alert({ setShow, Description, Header }) {
  const [open, setOpen] = React.useState(true);

  const onClickHander = () => {
    setOpen(false);
    setShow(false);
  };
  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      //   trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>{Header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {Description}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClickHander}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default Alert;
