'use client';
/* eslint-disable react/jsx-no-undef */
import { createContext, useReducer } from 'react';
import { Notification, NotificationProps } from '../components/notification/Notification';

export const NotificationContext = createContext({});

export const NotificationProvider = (
    {
        children
    }: {
        children: React.ReactNode
    }): React.ReactNode => {
    const [state, dispatch] = useReducer((state: Partial<NotificationProps[]>, action: { type?: string; notification?: Partial<NotificationProps>; id?: number; }) => {
        switch (action.type) {
            case 'ADD_NOTIFICATION':
                return [...state, action.notification]
            case 'REMOVE_NOTIFICATION':
                return state.filter((notification) => (notification?.id as Pick<NotificationProps, 'id'>) !== action?.id);
            default:
                throw new Error(`Unknown action invoked, ${action.type}`)
        }

    }, []);

    return (
        <NotificationContext.Provider value={dispatch}>
            {children}
            {state.map((notification, notificationIdx) => (
                <Notification key={notificationIdx} dispatch={dispatch} {...notification} />
            ))}
        </NotificationContext.Provider>
    )
}