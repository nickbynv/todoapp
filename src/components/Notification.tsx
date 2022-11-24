import { memo } from 'react';

export default memo((props: {
    state: {
        show: boolean
        success: boolean
        error: boolean
    }
}) => {
    return (
        <div className={`
            ${props.state.show ? 'opacity-1' : 'opacity-0'}
            ${props.state.success ? 'bg-green-500' : props.state.error && 'bg-red-500'}
            absolute bottom-10 right-20 z-20 transition-all
            py-4 px-12 rounded-lg font-semibold text-xl text-white
        `}>
            {props.state.success ? (
                <h1>Success!</h1>
            ) : props.state.error && (
                <h1>Error</h1>
            )}
        </div>
    )
})