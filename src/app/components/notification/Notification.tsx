import { AddNotification } from '@/app/hooks/notification';
import { Dispatch, useMemo } from 'react';

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
    const backgroundColor = useMemo(() => {
        return (type: AddNotification['type']) => {
            switch (type) {
                case 'info':
                    return 'bg-blue-500'
                case 'success':
                    return 'bg-green-500'
                case 'error':
                    return 'bg-red-500'
            }
        }
    }, [])
    return (
        <div className={`absolute top-16 left-[50%] m-auto p-2 rounded ${backgroundColor} text-white`}>
            {content}
        </div>
    );
};
