import { SessionType, useSession, useUpdateProfileManagers } from '@lens-protocol/react-web';

export function AddProfileManagers() {
    const { data:session } = useSession();
    if (session && session.type === SessionType.WithProfile) {
    const { execute, loading, error } = useUpdateProfileManagers();

    const add = async () => {
        const result = await execute({
            add: ['0x01'],
        });

        if (result.isFailure()) {
            console.log(result.error.message);
        }
    };


    return (
        <div>
            {error && <p>Error: {error.message}</p>}
            <button onClick={add} disabled={loading} className='btn btn-outline btn-sm'>添加</button>
        </div>
    );
}
}


export function RemoveProfileManagers({address}) {
    const { data:session } = useSession();
    if (session && session.type === SessionType.WithProfile) {
    const { execute, loading, error } = useUpdateProfileManagers();

    const remove = async () => {
        const result = await execute({
            remove: [address],
        });

        if (result.isFailure()) {
            console.log(result.error.message);
        }
    };


    return (
        <div>
            {error && <p>Error: {error.message}</p>}
            <button onClick={remove} disabled={loading} className='btn btn-error btn-outline btn-sm'>删除</button>
        </div>
    );
}
}