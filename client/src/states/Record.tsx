import { atom } from "recoil";

export const RecordedText = atom({
    key: "recordedText",
    default: "",
})

export const Recording = atom({
    key: "recorded",
    default: false
})

export const RecorderVisible = atom({
    key: "recorderVisible",
    default: false
})