import React from "react";
import { Button, Modal } from "../../../../component/UI";
import Prompt from "../../../../component/UI/Prompt";
interface DeletePhotoProp {
  isOpen: boolean;
  setIsOpen: () => void;
}
const DeletePhoto = ({ isOpen, setIsOpen }: DeletePhotoProp) => {
  return (
    <Prompt
      content="Are you sure you want to delete this photo? The photo can not be retrieved once it is deleted."
      title="Photo delete"
      isOpen={isOpen}
      onClose={setIsOpen}
      onCancel={() => {}}
      onHandle={() => {}}
      contentCancel="Cancel"
      contentHandle="Delete"
    />
  );
};

export default DeletePhoto;
