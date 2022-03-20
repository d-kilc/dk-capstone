export default function UserBadge({user}) {
    return (
        <div className='badge'>
            {user.name[0]}
        </div>
    )
}