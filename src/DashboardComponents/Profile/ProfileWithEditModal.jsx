"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { uploadToImgBB } from "@/app/api/Server/api";

export default function ProfileComponent({ user }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = Object.fromEntries(new FormData(e.target));
   const image = await uploadToImgBB(formData.image);
  console.log(image)
    const { data, error } = await authClient.updateUser({
      name: formData.name || user?.name,
      role: formData.role || user?.role,
      location: formData.location || user?.location,
      bio: formData.bio || user?.bio,
      image: image || user?.image
    });
    if (data) {
      toast.success("update profile successfully !");
    } else if (error) {
      toast.error("failed to update profile");
    }
  };

  return (
    <div className="flex items-center  justify-center">
      <Modal>
        <Button className="w-full mb-6 flex items-center justify-center gap-2 bg-info text-white font-medium py-2.5 px-4 rounded-xl shadow-sm ">
          <FaUserEdit className="text-lg" />
          <span>Edit Profile</span>
        </Button>

        {/* Backdrop overlay layer */}
        <Modal.Backdrop variant="blur" className="">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md overflow-y-scroll bg-white dark:bg-black dark:border dark:border-neutral-800">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Icon className=" dark:bg-neutral-900 dark:text-white">
                  <FaUserEdit className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit Profile</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Label>Name</Label>
                    <TextField
                      className="w-full bg-background"
                      name="name"
                      type="text"
                    >
                      <Input
                        className="bg-background "
                        placeholder="Enter your full name"
                      />
                    </TextField>

                    <TextField name="image" className="w-full" type="file">
                      <Label>Image</Label>
                      <input type="file"
                      name="image"
                        className="bg-background"
                      
                      />
                    </TextField>
                    <TextField className="w-full" name="role" type="text">
                      <Label>Role</Label>
                      <Input
                        className="bg-background"
                        placeholder="Enter your role"
                      />
                    </TextField>

                    <TextField className="w-full" name="location" type="text">
                      <Label>Location</Label>
                      <Input
                        className="bg-background"
                        placeholder="Enter your location"
                      />
                    </TextField>

                    <TextField className="w-full " name="bio" type="text">
                      <Label>Biography</Label>
                      <Input
                        className="bg-background"
                        placeholder="Tell people about yourself"
                      />
                    </TextField>
                    <Modal.Footer>
                      <Button
                        slot="close"
                        className="bg-cyan-100 text-info dark:bg-neutral-900 dark:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        slot="close"
                        className="bg-info text-white dark:bg-neutral-50 dark:text-black"
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
