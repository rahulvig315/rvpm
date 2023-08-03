'use client';
import { Context, Dispatch, createContext, useReducer } from 'react';
import { Notification, NotificationProps } from '../components/notification/Notification';


type NotificationDispatch = Dispatch<{ type?: string, notification?: Partial<NotificationProps>, id?: string }>


export type NotificationContextType = Context<{
    dispatch: NotificationDispatch,
    notifications: NotificationProps[]
}>

export const NotificationContext: NotificationContextType = createContext({
    dispatch: {} as NotificationDispatch,
    notifications: [] as NotificationProps[]
});

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
        <NotificationContext.Provider value={{ dispatch: dispatch as NotificationDispatch, notifications: state as NotificationProps[] }}>
            {children}
            {state.map((notification, notificationIdx) => (
                <Notification key={notificationIdx} dispatch={dispatch} {...notification} />
            ))}
        </NotificationContext.Provider>
    )
}