const APP_CONSTANTS = {
    APP_NAME: 'RV Project Manager',
    APP_SHORTNAME: 'RVPM',
    APP_DESCRIPTION: 'Simple Kanban CRUD Project Manager'
}

export const { APP_NAME, APP_SHORTNAME, APP_DESCRIPTION } = APP_CONSTANTS;

export enum NotificationTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARN = 'warn',
    ERROR = 'error',
}

export const NotificationBackgroundClasses = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warn: 'bg-yellow-500',
    error: 'bg-red-500',
}

export const REQUEST_HEADERS = {
    CONTENT_TYPE: {
        "Content-Type": 'application/json'
    },
}

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    DELETE = 'DELETE'
}