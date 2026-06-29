"use client";

import { deleteRectuitersJobs } from "@/app/api/Server/Server";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";

export function DeleteModal({ id }) {
     
  const handleDelete = async () => {
   try {
      
    const result = await deleteRectuitersJobs(id);
console.log(result, id)
    if (result.deletedCount > 0) {

      toast.success("Company deleted successfully!");
    } else {
      toast.error("Company not found or already deleted.");
    }
  } catch (error) {
   
    console.error(error);
  }
  };
  return (
    <AlertDialog>
      <Button
        className="p-2 rounded-lg bg-none text-rose-500 opacity-80 hover:opacity-100 bg-rose-500/10 active:scale-95 transition"
        title="Delete"
      >
        <IoTrashOutline className="text-base" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                type="bytton"
                slot="close"
                variant="danger"
              >
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
