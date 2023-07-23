import { NotificationContext } from "@/app/context/Notification";
import { Dispatch, useContext } from "react";
import { NotificationProps } from "../components/notification/Notification";


type NotificationDispatch = Dispatch<{ type?: string, notification?: Partial<NotificationProps>, id?: string }>

export const useNotification = () => {
    const dispatch: NotificationDispatch = useContext(NotificationContext) as NotificationDispatch;

    return (content = '', type = "info") => {
        const id = Math.random().toString(36).substring(7);
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: { id, content, type } as Partial<NotificationProps>
        })

        setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', id });
        }, 3000);
    }
}