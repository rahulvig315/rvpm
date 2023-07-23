import { NotificationContext } from "@/app/context/Notification";
import { Dispatch, useContext } from "react";
import { NotificationProps } from "../components/notification/Notification";
import { NotificationTypes } from '../constants/index';


type NotificationDispatch = Dispatch<{ type?: string, notification?: Partial<NotificationProps>, id?: string }>

export type AddNotification = {
    content?: string;
    type: NotificationTypes
}


export const useNotification = () => {
    const dispatch: NotificationDispatch = useContext(NotificationContext) as NotificationDispatch;

    return (content: AddNotification['content'] = '', type: AddNotification['type'] = NotificationTypes.INFO) => {
        const id = Math.random().toString(36).substring(2);
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: { id, content, type } as Partial<NotificationProps>
        })

        setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', id });
        }, 3000);
    }
}