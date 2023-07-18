import { Dispatch } from 'react';

export type NotificationProps = {
    id?: string;
    content?: string;
    type?: string;
    dispatch?: Dispatch<{
        type?: string;
        notification?: NotificationProps;
        id?: number;
    }>
}

export const Notification = ({ id, content, type, dispatch }: NotificationProps) => {
    return (
        <div className={`absolute top-16 left-[50%] m-auto p-2 rounded ${type === 'info' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {content}
        </div>
    );
};
