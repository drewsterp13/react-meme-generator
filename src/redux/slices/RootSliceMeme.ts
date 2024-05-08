import { createSlice } from "@reduxjs/toolkit"

const rootSliceMeme = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        caption: "Caption",
        photo_id: "Photo ID",
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseCaption: (state, action) => { state.caption = action.payload },
        choosePhotoID: (state, action) => { state.photo_id = action.payload },
    }
})

export const reducer = rootSliceMeme.reducer;
export const { chooseTitle, chooseCaption, choosePhotoID } = rootSliceMeme.actions