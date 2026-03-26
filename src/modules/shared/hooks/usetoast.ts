import { useDispatch } from "react-redux";
import { addToast } from "../../redux/slice/ToastSlice";

type ToastType = {
    id: number;
    message: string;
    type: number;
    timer: ReturnType<typeof setTimeout>;
  };
  
  const DURATION = 5000;
  const MAX_QUEUE_SIZE = 5;
  let toastQueue: Array<ToastType> = [];
  let currentID = 0;
  
  function useToast() {
    const dispatch = useDispatch();
    return (message: string, props?: { type: ("error"|"success") }) => {
      while (toastQueue.length >= MAX_QUEUE_SIZE) {
        clearTimeout(toastQueue[0].timer);
        toastQueue = [...toastQueue.slice(1, toastQueue.length)];
        dispatch(addToast(toastQueue));
      }
  
      const id = currentID++;
  
      const timer = setTimeout(() => {
        toastQueue = [...toastQueue.filter((t) => t.id !== id)];
        dispatch(addToast(toastQueue));
      }, DURATION);
  
      toastQueue = [...toastQueue, { id, message, type: props ? (props.type === "success" ? 0 : 1) : 2, timer }];
      dispatch(addToast(toastQueue));
    };
  }
  
  export default useToast;