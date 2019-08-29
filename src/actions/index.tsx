
export const initialize = (data) => {
    return { type: 'INITIALIZING', data: data }
}

export const addPressPicto = (picto) => {
    return { type: 'ADD_WORD', picto: picto }
}

export const clearTopBarText = () => {
    return { type: 'CLEAR_TEXT' }
}

export const removeLastPicto = () => {
    return { type: 'REMOVE_LAST'}
}

export const resetApp = () => {
    return { type: 'RESET'}
}

