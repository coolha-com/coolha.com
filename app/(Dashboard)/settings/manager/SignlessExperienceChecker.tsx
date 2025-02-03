import { useSession, SessionType, useUpdateProfileManagers } from "@lens-protocol/react-web";

function SignlessExperienceChecker() {
    const { data } = useSession();
    if (data?.type === SessionType.WithProfile && data.profile.signless) {

        let isEnabled = data.profile.signless;

        const { execute, loading, error } = useUpdateProfileManagers();
        function handleDisable(callback) {
            execute({ approveSignless: false })
                .then(() => {
                    console.log('无签名事务已禁用');
                    callback();
                })
                .catch((err) => {
                    console.error('禁用无签名事务时发生错误：', err);
                    callback(err);
                });
        }

        function handleEnable(callback) {
            execute({ approveSignless: true })
                .then(() => {
                    console.log('无签名事务已启用');
                    callback();
                })
                .catch((err) => {
                    console.error('启用无签名事务时发生错误：', err);
                    callback(err);
                });
        }
        return (
            <div className='p-2 gap-1'>
                <b className='p-2'>禁用无签名事务</b>
                <p className='p-2'>您可以启用 Lens Manager 与 Coolha 交互，而无需签署您的任何交易。</p>
                <button className={`btn btn-outline btn-sm p-2 ${isEnabled ? 'btn-error' : ''}`} onClick={() => (isEnabled ? handleDisable(() => { }) : handleEnable(() => { }))}>
                    {isEnabled ? '禁用' : '启用'}
                </button>
            </div>
        );
    }
    return <p>个人资料不符合无 Signless 体验的条件</p>;
}

export default SignlessExperienceChecker;