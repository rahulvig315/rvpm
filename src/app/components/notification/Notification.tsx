import { NotificationBackgroundClasses, NotificationTypes } from '@/app/constants';
import { AddNotification } from '@/app/hooks/notification';
import { Dispatch } from 'react';

export type NotificationProps = {
    id?: string;
    content?: string;
    type?: AddNotification['type'];
    dispatch?: Dispatch<{
        type?: string;
        notification?: NotificationProps;
        id?: number;
    }>
}

export const Notification = ({ id, content, type, dispatch }: NotificationProps) => {
    return (
        <div className={`absolute top-16 left-[50%] m-auto p-2 rounded ${NotificationBackgroundClasses[type as NotificationTypes]} text-white`}>
            {content}
        </div >
    );
};
