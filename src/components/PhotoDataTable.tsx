import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPhotos } from "../custom-hooks/FetchPhotos"

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "link", headerName: "Link", width: 260},
]

export default function PhotoDataTable() {
    const { photoData } = useGetPhotos();

    return (
    <div>
        <h1 className="font-bold text-3xl">Photo Table</h1>
        <div>
            <DataGrid
                rows={photoData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]} />
        </div>
    </div>
  )
}
