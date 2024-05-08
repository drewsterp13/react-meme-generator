import React from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux";
import { chooseTitle, chooseCaption, choosePhotoID } from "../redux/slices/RootSliceMeme";

interface AddMemeProps {
    id?: string[]
}

const AddMemeForm = ( props:AddMemeProps ) => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const store = useStore();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = (data: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)
        if (props.id && props.id.length > 0) {
            server_calls.update("memes", props.id[0], data)
            console.log(`UPDATED ${data.title} ${data.caption} ${data.photo_id}`)
        } else {
            dispatch(chooseTitle(data.title))
            dispatch(chooseCaption(data.caption))
            dispatch(choosePhotoID(data.photo_id))
            console.log(`ADDED ${data.title} ${data.caption} ${data.photo_id}`)
            server_calls.add("memes", store.getState())
        }
    }

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className="flex flex-row justify-between w-80">
                <p className="mr-2 font-semibold">TITLE:</p>
                <input {...register("title")} className="bg-gray-200 border border-solid border-1 border-black text-gray-800" type="text" name="title" placeholder="enter here"/>
            </div>
            <div className="flex flex-row justify-between w-80">
                <p className="mr-2 font-semibold">CAPTION:</p>
                <input {...register("caption")} className="bg-gray-200 border border-solid border-1 border-black text-gray-800" type="text" name="caption" placeholder="enter here"/>
            </div>
            <div className="flex flex-row justify-between w-80">
                <p className="mr-2 font-semibold">PHOTO ID:</p>
                <input {...register("photo_id")} className="bg-gray-200 border border-solid border-1 border-black text-gray-800" type="text" name="photo_id" placeholder="enter here"/>
            </div>
            <button className="bg-green-500 text-white m-3 p-1 rounded hover:bg-green-800 font-semibold" onClick={handleOpen}>SUBMIT</button>
            <Modal className="flex flex-col items-center" open={open} onClose={handleClose}>
                <div className="text-center bg-gray-800 text-white h-24 w-80 inset-0">
                    <h1 className="text-xl bg-gray-900">Data has been submitted</h1>
                    <div className="flex flex-row justify-center">  
                        <button className="bg-gray-200 text-black m-3 p-1 rounded hover:bg-gray-400 w-12 font-semibold" onClick={handleClose}>okay</button>
                    </div>
                </div>
            </Modal>
        </form>
        </div>
    )
}

export default AddMemeForm