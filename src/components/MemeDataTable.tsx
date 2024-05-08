import React, { useState } from "react"
import Modal from "@mui/material/Modal";
import { server_calls } from "../api/server"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMemes } from "../custom-hooks/FetchMemes"
import AddMemeForm from "../components/AddMemeForm";

interface mySelectionModel {
    selmodel: string[];
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "caption", headerName: "Caption", width: 260},
    { field: "photo_id", headerName: "Photo ID", width: 130 },
]

// const rows = [
//     { id: 1, title: "meme_1", caption: "This is meme one", photo_id: "photo_is_here" },
//     { id: 2, title: "meme_2", caption: "This is meme two", photo_id: "/gamemode 1 @a" },
//     { id: 3, title: "meme_3", caption: "This is meme tres", photo_id: "aqui" },
// ]



function MemeFormModal( prop: mySelectionModel ) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button className="bg-gray-500 text-black m-3 p-1 rounded hover:bg-gray-800 hover:text-white" onClick={handleOpen}>ADD MEME</button>
            <button className="bg-gray-500 text-black m-3 p-1 rounded hover:bg-gray-800 hover:text-white" onClick={handleOpen}>UPDATE MEME</button>
            <Modal className="flex flex-col items-center" open={open} onClose={handleClose}>
                <div className="text-center bg-gray-800 text-white w-96 inset-0">
                    <h1 className="text-xl bg-gray-900">Enter data</h1>
                    <AddMemeForm id={prop.selmodel} />
                    <div className="flex flex-row justify-center">  
                        <button className="bg-red-600 text-white m-3 p-1 rounded hover:bg-red-700 font-semibold" onClick={handleClose}>exit</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default function MemeDataTable() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { memeData, getData } = useGetMemes();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const deleteData = () => {
        server_calls.delete("memes", selectionModel[0])
        getData();
        console.log(selectionModel[0])
        setTimeout( () => { location.reload()}, 500)
        handleClose()
    }

    return (
    <div>
        <h1 className="font-bold text-3xl">Meme Table</h1>
        <div className="flex flex-row justify-center">
            <MemeFormModal selmodel={selectionModel}/>
            <button className="bg-gray-500 text-black m-3 p-1 rounded hover:bg-red-700 hover:text-white" onClick={handleOpen}>DELETE MEME</button>
            <Modal className="flex flex-col items-center" open={open} onClose={handleClose}>
                <div className="text-center bg-gray-800 text-white h-24 w-80">
                    <h1 className="text-sl bg-gray-900">Are you sure you want to delete?</h1>
                    <div className="flex flex-row justify-center">
                        <button className="bg-red-600 text-black m-3 p-1 rounded hover:bg-red-700 hover:text-white w-12" onClick={deleteData}>yes</button>
                        <button className="bg-gray-200 text-black m-3 p-1 rounded hover:bg-gray-400 hover:text-black w-12" onClick={handleClose}>no</button>
                    </div>
                </div>
            </Modal>
        </div>
        <div>
            <DataGrid
                rows={memeData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={ (item:any) => {
                    setSelectionModel(item)
                }} />
        </div>
    </div>
  )
}
