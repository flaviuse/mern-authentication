import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { thunkDispatch, AppState } from "./store";

const useAppDispatch = () => useDispatch<thunkDispatch>();
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useAppDispatch, useAppSelector };
